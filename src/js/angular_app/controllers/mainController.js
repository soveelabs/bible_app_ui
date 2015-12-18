(function() {

  angular.module('obaui')
    .controller('MainController',
        ['$scope', 
         '$http', 
         '$route',
         '$location',
         '$routeParams',
				 '$mdDialog',
				 '$mdMedia',
         function($scope, $http, $route, $location, $routeParams, $mdDialog, $mdMedia) {

      $scope.$route = $route;
      $scope.$location = $location;
      $scope.$routeParams = $routeParams;

      // ======== API path
      var apiPath= '/api/1.0';


      // ======== HTTP requests
      $http.get('/auth/user')
        .success(function(data, status, headers, config) {
          $scope.token = data.extra.token;
        })
        .error(function(data, status, headers, config) {
          // handle errors
          console.log('ERROR:: Failed to get /auth/user.');
          console.log('ERROR:: Error code: ' + status);
        });


      // ======== Functions
      $scope.toggleSidenav = function (name) {
        // toggle the sidenave with the name of name
      }


			$scope.showBibleImport = function(ev) {
				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
				$mdDialog.show({
					controller: DialogController,
					templateUrl: '/partials/import.html',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose:true,
					fullscreen: useFullScreen
				})
				.then(function(answer) {
					$scope.status = 'You said the information was "' + answer + '".';
				}, function() {
					$scope.status = 'You cancelled the dialog.';
				});
				$scope.$watch(function() {
					return $mdMedia('xs') || $mdMedia('sm');
				}, function(wantsFullScreen) {
					$scope.customFullscreen = (wantsFullScreen === true);
				});
			};

    }]); /* END MainController */

  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }

})();
