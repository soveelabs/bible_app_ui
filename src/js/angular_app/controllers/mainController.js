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

      $scope.showCreateTranslation = function(ev){
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
        $mdDialog.show({
          controller: CreateTranslationController,
          templateUrl: '/partials/createTranslation.html',
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

  function DialogController($scope, $mdDialog, $http) {
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      var apiPath = '/api/1.0';
      var apiUrl = apiPath + '/bibles/import';
      //apiUrl += $scope.bible_id ? '/' + $scope.bible_id : '';
      apiUrl += '?token=25142499049aa20261871b2db25eea92a5fe4e72&bible_id=' + $scope.bible.id + '&bible_langCode=' + $scope.bible.languageCode + '&bible_version=' + $scope.bible.version + '&bible_url=' + $scope.bible.url;
      

      // ======== HTTP requests
      $http.get(apiUrl)
        .success(function(data, status, headers, config) {
          $scope.bible_import_data = data;
        })
        .error(function(data, status, headers, config) {
          // handle errors
          console.log('ERROR:: Failed to get /bibles');
          console.log('ERROR:: Error code: ' + status);
        });

      $mdDialog.hide(answer);
    };
  }

  function CreateTranslationController($scope, $mdDialog, $http, $routeParams) {
    $scope.bible_sourceBibleId = $routeParams.bible_id;
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      var apiPath = '/api/1.0';
      var apiUrl = apiPath + '/bibles/createTranslation';
      //apiUrl += $scope.bible_id ? '/' + $scope.bible_id : '';
      apiUrl += '?token=25142499049aa20261871b2db25eea92a5fe4e72&bible_id=' + $scope.bible_id + '&bible_langCode=' + $scope.bible_languageCode + '&bible_version=' + $scope.bible_version + '&bible_sourceBibleId=' + $scope.bible_sourceBibleId + '&bible_status=' + $scope.bible_status;
      

      // ======== HTTP requests
      $http.get(apiUrl)
        .success(function(data, status, headers, config) {
          $scope.bible_translation_data = data;
        })
        .error(function(data, status, headers, config) {
          // handle errors
          console.log('ERROR:: Failed to get /bibles');
          console.log('ERROR:: Error code: ' + status);
        });

      $mdDialog.hide(answer);
    };
  }

})();
