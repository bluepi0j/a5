'use strict';

angular.module('users').controller('EditProfileController', ['$scope', '$http', '$location', 'Authentication',
  'UserService',
  function ($scope, $http, $location, Authentication, UserService) {
    $scope.user = Authentication.user;

    // Update a user profile
    $scope.updateUserProfile = function (isValid) {
      $scope.success = $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      UserService.updateProfile($scope.user).success(function(response) {
        $scope.$broadcast('show-errors-reset', 'userForm');

        $scope.success = true;
        Authentication.user = response;
      }).error(function(response) {
            $scope.error = response.data.message;
          })
      //var user = new Users($scope.user);
      //
      //user.$update(function (response) {
      //  $scope.$broadcast('show-errors-reset', 'userForm');
      //
      //  $scope.success = true;
      //  Authentication.user = response;
      //}, function (response) {
      //  $scope.error = response.data.message;
      //});
    };
  }
]);
