(function(){

  angular.module('obaui')

    // Define the routes for the app
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: '/partials/bibles.html',
          controller: 'BiblesController'
        })
        .when('/bibles/:bible_id?', {
          templateUrl: '/partials/bibles.html',
          controller: 'BiblesController'
        })
        .when('/:bible_id/translations/:trans_bible_id/books', {
          templateUrl: '/partials/books.html',
          controller: 'BooksController'
        })
	.when('/:bible_id/translations', {
          templateUrl: '/partials/translations.html', 
          controller: 'TranslationsController'  
	})
        .when('/:bible_id/translations/:trans_bible_id/books/:book_id/chapters', {
          templateUrl: '/partials/chapters.html', 
          controller: 'ChapterController'
        })
	.when('/:bible_id/translations/:trans_bible_id/books/:book_id/chapters/:chapter_id/export', {
	  templateUrl: '/partials/exports.html',
	  controller: 'TransmissionController'
	})
        .otherwise({
          redirectTo: '/'
        });
    });

})();
