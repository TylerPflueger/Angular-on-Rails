(function() {
    var app = angular.module('app');

    app.factory('Todo', ['$resource', function ($resource) {
        var Todo = $resource('/api/v1/todos/:id.json', {id: '@id'}, {
            update: {
                method: 'PUT'
            }
        });

        return Todo;
    }]);
})();