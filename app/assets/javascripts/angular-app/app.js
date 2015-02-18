(function() {
    var app = angular.module('app', ['ngRoute', 'ngResource', 'templates']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            controller: 'MainCtrl'
        }).when('/:status', {
            controller: 'MainCtrl'
        }).otherwise({
            redirectTo: '/'
        });
    }]);
})();