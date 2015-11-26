'use strict';

angular.module('users.admin').controller('UserController', ['$scope', '$state', 'Authentication', 'userResolve',
    'AdminService',
    function ($scope, $state, Authentication, userResolve, AdminService) {
        $scope.authentication = Authentication;
        $scope.user = userResolve.data;

        $scope.remove = function (user) {
            console.log(user);

            if (confirm('Are you sure you want to delete this user?')) {
                if (user) {
                    AdminService.removeUser(user._id);

                    $scope.users.splice($scope.users.indexOf(user), 1);
                } else {
                    console.log($scope.user);
                    AdminService.removeUser($scope.user._id).success(function () {
                        $state.go('admin.users');
                    });

                }
            }
        };

        $scope.update = function (isValid) {
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'userForm');

                return false;
            }

            var user = $scope.user;
            AdminService.updateUser(user._id, user).success(function(a, b) {
                $state.go('admin.user', {
                    userId: user._id
                });
            }).error(function(errorResponse) {
                $scope.error = errorResponse.data.message;
            })

        };
    }
]);
