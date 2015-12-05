'use strict';

//Users service used for communicating with the users REST endpoint
//angular.module('users').factory('Users', ['$resource',
//  function ($resource) {
//    return $resource('api/users', {}, {
//      update: {
//        method: 'PUT'
//      }
//    });
//  }
//]);

angular.module('users').service('UserService', function($http) {

    var service = this;


    service.updateProfile = function (data) {
        return $http({
            url: '../api/users',
            method: 'put',
            data: JSON.stringify(data)
        })
    }

    return service;
})

//TODO this should be Users service
angular.module('users.admin').factory('Admin', ['$resource',
  function ($resource) {
    return $resource('api/users/:userId', {
      userId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

//TODO this should be Users service
angular.module('users.admin').service('AdminService', function($http) {

    var service = this;


    service.getUserList = function () {
        return $http({
            url: '../api/users',
            method: 'GET',
        })
    }

    service.getOneUser = function (userID) {
        return $http({
            url: '../api/users/' + userID,
            method: 'GET',
        })
    }

    service.removeUser = function (userID) {
        return $http({
            url: '../api/users/' + userID,
            method: 'DELETE'
        })
    }

    service.updateUser = function (userID, data) {
        return $http({
            url: '../api/users/' + userID,
            method: 'PUT',
            data: JSON.stringify(data)
        })
    }

    service.changePassword = function(userID, data) {
        return $http({
            url: '../api/users/password/' + userID,
            method: 'POST',
            data: JSON.stringify(data)
        })
    }
    return service;
})
