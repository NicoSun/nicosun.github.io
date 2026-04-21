app.factory('places', ['$http', function($http) {
  return {
    getPlaces: function(lat, lon) {
      var url = 'https://en.wikipedia.org/w/api.php' +
        '?action=query' +
        '&list=geosearch' +
        '&gsradius=5000' +
        '&gscoord=' + lat + '%7C' + lon +
        '&gslimit=30' +
        '&format=json' +
        '&origin=*' +          // Required for CORS
        '&callback=JSON_CALLBACK';

      return $http.jsonp(url)
        .then(function(response) {
          return response.data;   // controller gets the data directly
        }, function(error) {
          console.error('Wikipedia API failed', error);
          return {};  // return empty object to prevent silent failure
        });
    }
  };
}]);