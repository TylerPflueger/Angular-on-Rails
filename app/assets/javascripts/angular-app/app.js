
    var app = angular.module('app', ['ngRoute', 'ngResource', 'templates']);

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            controller: 'MainCtrl',
            templateUrl: 'show.html'
        }).when('/:status', {
            controller: 'MainCtrl'
        }).when('/home', {
            controller: 'MainCtrl'
        }).otherwise({
            redirectTo: '/'
        });
    }]);
