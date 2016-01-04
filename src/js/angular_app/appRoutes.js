(function(){

  angular.module('obaui')

    // Define the routes for the app
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: '/partials/home.html',
          controller: 'MainController'
        })
        .when('/bibles/:bible_id?', {
          templateUrl: '/partials/bibles.html',
          controller: 'BiblesController'
        })
        .when('/books/:bible_id?', {
          templateUrl: '/partials/books.html',
          controller: 'BooksController'
        })
	.when('/:bible_id/translations', { 	
          templateUrl: '/partials/translations.html', 
          controller: 'TranslationsController'  
	})
        .when('/chapters/:chapter_id?', {
          templateUrl: '/partials/chapters.html', 
          controller: 'ChapterController'
        })
        .otherwise({
          redirectTo: '/'
        });
    });

})();
