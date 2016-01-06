var app = angular.module('RedditUserComments', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/:param', {
            templateUrl: 'js/main/main.html',
            controller: 'MainCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});
