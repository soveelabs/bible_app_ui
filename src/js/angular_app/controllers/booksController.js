(function() {

  angular.module('obaui')
    .controller('BooksController', function($scope, $http, $routeParams) {

      $scope.bible_id = $routeParams.bible_id || '';
	$scope.trans_bible_id = $routeParams.trans_bible_id || '';

      // API path
      var apiPath = '/api/1.0';
      var apiUrl = apiPath + '/bibles/books';
      //apiUrl += $scope.bible_id ? '/' + $scope.bible_id : '';
      apiUrl += '?token=25142499049aa20261871b2db25eea92a5fe4e72&bible_id=' + $scope.bible_id;
      

      // ======== HTTP requests
      $http.get(apiUrl)
        .success(function(data, status, headers, config) {
          $scope.books_data = data;
        })
        .error(function(data, status, headers, config) {
          // handle errors
          console.log('ERROR:: Failed to get /bibles');
          console.log('ERROR:: Error code: ' + status);
        });


    }); /* END BiblesController */

})();
