var app = angular.module('RedditUserComments', ['ngRoute', 'ngSanitize']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/:param', {
          templateUrl: 'app/main/main.html',
          controller: 'MainCtrl'
      })
      .otherwise({
          redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
});
