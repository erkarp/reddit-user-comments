app.config(function ($routeProvider) {
    $routeProvider
        .when('/:param', {
            templateUrl: 'js/main/main.html',
            controller: 'js/main/main-ctrl.js'
        })
        .otherwise({
            redirectTo: '/'
        });
});
