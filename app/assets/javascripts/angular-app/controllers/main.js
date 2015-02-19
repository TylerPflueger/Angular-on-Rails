(function() {

    var app = angular.module('app');

    app.controller('MainCtrl', ['Todo', '$scope', '$routeParams', mainCtrl]);

    function mainCtrl(Todo, $scope, $routeParams) {
            $scope.todos = Todo.query();

            $scope.$watch('todos', function (newValue, oldValue) {
                var trythis;

                _.forEach(newValue, function(val) {
                    _.forEach(oldValue, function (oldVal) {
                        if(val.id === oldVal.id) {
                            if(val.completed !== oldVal.completed) {
                                trythis = val;
                            }
                        }
                    });
                });
                if(!_.isUndefined(trythis)) {
                    $scope.save(trythis);
                }
            }, true);

            $scope.$on('$routeChangeSuccess', function () {
                var status = $scope.status = $routeParams.status || '';

                $scope.statusFilter = (status === 'active') ?
                {completed: false} : (status === 'completed') ?
                {completed: true} : null;
            });

            var uncompletedTodos;

            $scope.activeTodo = new Todo();

            $scope.checked = false;

            $scope.edit = function (todo) {
                $scope.activeTodo = todo;
            };

            $scope.checkAll = function (checked) {
                _.each($scope.todos, function (todo) {
                    $scope.checkAndSave(todo, checked);
                });
            };

        $scope.checkAndSave = function(todo, checked) {
            $scope.save(todo);
        };

            $scope.save = function (todo) {
                if (!_.include($scope.todos, todo)) {
                    $scope.todos.push(todo);
                    todo.$save();
                } else {
                    Todo.update(todo);
                }
                updateRemainingTodoCount();
                $scope.activeTodo = new Todo();
            };

            $scope.remove = function (todo) {
                Todo.delete(todo);
                _.remove($scope.todos, todo);
                updateRemainingTodoCount();
            };

            function updateRemainingTodoCount() {
                uncompletedTodos = _.chain($scope.todos)
                    .map(function (todo) {
                        return !todo.completed
                    })
                    .compact()
                    .value();
                $scope.remainingCount = uncompletedTodos.length;
            };

        }
})();