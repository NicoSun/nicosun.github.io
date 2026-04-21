var app = angular.module('myApp', []);

// Places service
app.factory('places', ['$http', function($http) {
  return {
    getPlaces: function(lat, lon) {
      var url = 'https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gsradius=5000&gscoord='
        + lat + '|' + lon + '&gslimit=30&format=json&origin=*';
      return $http.get(url)
        .then(function(resp){ return resp.data; })
        .catch(function(err){
          console.error('Wikipedia API failed', err);
          return {};
        });
    }
  };
}]);


// Controller
app.controller('CityController', ['$scope', '$http', 'places', '$timeout', function($scope, $http, places, $timeout) {

  $scope.cities = [];
  $scope.selectedCity = "";
  $scope.markers = [];
  var leafletMarkers = [];
  var map;

  // Load cities JSON
  $http.get('js/cities.json')
    .then(function(response) {
      $scope.cities = response.data.cities;
    })
    .catch(function(error) { console.error(error); });

  // Delay map initialization until DOM ready
  $timeout(function() {
    map = L.map('map').setView([51.34, 12.375], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
  }, 0);

  function getMessage(title) {
    var url = "https://en.wikipedia.org/wiki/" + encodeURIComponent(title);
    return "<a target='_blank' href='" + url + "'>" + title + "</a>";
  }

  function geodataToMarkers(geodata) {
    if (!geodata.query || !geodata.query.geosearch) return [];
    return geodata.query.geosearch.map(function(place) {
      return { lat: place.lat, lng: place.lon, message: getMessage(place.title) };
    });
  }

  function clearLeafletMarkers() {
    leafletMarkers.forEach(function(m) { map.removeLayer(m); });
    leafletMarkers = [];
  }

  function addLeafletMarkers(markers) {
    markers.forEach(function(m) {
      var marker = L.marker([m.lat, m.lng]).addTo(map)
        .bindPopup(m.message);
      leafletMarkers.push(marker);
    });
  }

$scope.loadPlaces = function() {
  var city = $scope.selectedCity;
  if (!city) {
    console.warn('No city selected!');
    return;
  }

  map.setView([city.latitude, city.longitude], 15);

  places.getPlaces(city.latitude, city.longitude)
    .then(function(data) {
      $scope.markers = geodataToMarkers(data);
      clearLeafletMarkers();
      addLeafletMarkers($scope.markers);
    });
};

}]);