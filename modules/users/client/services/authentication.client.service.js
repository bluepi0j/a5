'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', ['$window',
  function ($window) {
    var auth = {
      user: $window.user
    };

    return auth;
  }
]);

angular.module('users').service('AuthenticationService', function($http) {

  var service = this;


  service.signin = function (data) {
    return $http({
      url: '../api/auth/signin',
      method: 'POST',
      data: JSON.stringify(data)
    })
  }

  service.signup = function (data) {
    return $http({
      url: '../api/auth/signup',
      method: 'POST',
      data: JSON.stringify(data)
    });
  }

  service.changePassword = function(data) {
    return $http({
      url: '../api/users/password',
      method: 'POST',
      data: JSON.stringify(data)
    })
  }

  return service;
})
