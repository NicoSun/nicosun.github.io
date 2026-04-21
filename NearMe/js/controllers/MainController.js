app.controller('MainController', ['$scope', 'places', function($scope, places) {
  $scope.center = {
    lat: 51.34,
    lng: 12.375,
    zoom: 17
  };

}]);