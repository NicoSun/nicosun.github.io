app.controller('CityController', ['$scope', '$http', 'places', function($scope, $http, places) {

  $scope.cities = [];
  $scope.selectedCity = "Leipzig";
  $scope.geodata = null;
  $scope.markers = [];

  // Load cities
  $http.get('js/cities.json')
    .then(function(response) {
      $scope.cities = response.data.cities;
    }, function(error) {
      console.error('Failed to load cities.json', error);
    });

  // Helper functions
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

  // Load places for selected city
  $scope.loadPlaces = function() {
    var city = $scope.cities.find(function(c) {
      return c.name === $scope.selectedCity;
    });
    if (!city) {
      console.warn('Selected city not found!');
      return;
    }

    places.getPlaces(city.latitude, city.longitude)
      .then(function(data) {
        $scope.geodata = data;
        $scope.markers = geodataToMarkers($scope.geodata);
      });
  };

}]);