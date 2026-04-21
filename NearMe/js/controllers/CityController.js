app.controller('CityController', ['$scope', '$http', 'places', function($scope, $http, places) {

  $scope.cities = [];
  $scope.selectedCity = "Leipzig";
  $scope.geodata = null;
  $scope.markers = [];

  // Initialize map
  var map = L.map('map').setView([51.3397, 12.3731], 13); // default to Leipzig
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  var leafletMarkers = []; // store Leaflet marker objects

  // Load cities
  $http.get('js/cities.json')
    .then(function(response) {
      $scope.cities = response.data.cities;
    }, function(error) {
      console.error('Failed to load cities.json', error);
    });

  function getMessage(title) {
    var url = "http://en.wikipedia.org/wiki/" + encodeURIComponent(title);
    return "<a target='_blank' href='" + url + "'>" + title + "</a>";
  }

  function geodataToMarkers(geodata) {
    if (!geodata.query || !geodata.query.geosearch) return [];
    return geodata.query.geosearch.map(function(place) {
      return {
        lat: place.lat,
        lng: place.lon,
        message: getMessage(place.title)
      };
    });
  }

  function clearLeafletMarkers() {
    leafletMarkers.forEach(function(m) {
      map.removeLayer(m);
    });
    leafletMarkers = [];
  }

  function addLeafletMarkers(markers) {
    markers.forEach(function(m) {
      var marker = L.marker([m.lat, m.lng]).addTo(map)
        .bindPopup(m.message);
      leafletMarkers.push(marker);
    });
  }

  // Load places for selected city
  $scope.loadPlaces = function() {
    var city = $scope.cities.find(function(c) {
      return c.name === $scope.selectedCity;
    });
    if (!city) {
      console.warn('Selected city not found!');
      return;
    }

    // Center map on city
    map.setView([city.latitude, city.longitude], 13);

    places.getPlaces(city.latitude, city.longitude)
      .then(function(data) {
        $scope.geodata = data;
        $scope.markers = geodataToMarkers($scope.geodata);

        // Update Leaflet markers
        clearLeafletMarkers();
        addLeafletMarkers($scope.markers);
      });
  };

}]);