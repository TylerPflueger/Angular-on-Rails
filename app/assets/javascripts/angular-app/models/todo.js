(function() {
    var app = angular.module('app');

    app.factory('Todo', ['$location', '$resource', function ($location, $resource) {
        var api = $location.absUrl();
        api = api.substring(0, api.length - 2);
        api = api + '/api/v1/todos/:id.json';
        console.log(api);
        var Todo = $resource(api, {id: '@id'}, {
            update: {
                method: 'PUT'
            }
        });

        return Todo;
    }]);
})();