'use strict';

angular.module('sketch').service('SketchNewService', function ($http) {

    var service = this;


    service.saveSketch = function (data) {
        return $http({
            url: '../api/sketchpad/save',
            method: 'POST',
            data: JSON.stringify(data)
        })
    }

    //service.signup = function (data) {
    //    return $http({
    //        url: service.url + '/api/auth/signup',
    //        method: 'POST',
    //        data: JSON.stringify(data)
    //    });
    //}
    //
    //service.changePassword = function (data) {
    //    return $http({
    //        url: service.url + '/api/users/password',
    //        method: 'POST',
    //        data: JSON.stringify(data)
    //    })
    //}

    return service;
})