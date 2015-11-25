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
    service.url = "http://127.0.0.1:3000";


    service.updateProfile = function (data) {
        return $http({
            url: service.url + '/api/users',
            method: 'put',
            data: JSON.stringify(data)
        })
    }

    return service;
})

//TODO this should be Users service
//angular.module('users.admin').factory('Admin', ['$resource',
//  function ($resource) {
//    return $resource('api/users/:userId', {
//      userId: '@_id'
//    }, {
//      update: {
//        method: 'PUT'
//      }
//    });
//  }
//]);
