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
        .when('/books/:book_id?', {
          templateUrl: '/partials/books.html',
          controller: 'BooksController'
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
