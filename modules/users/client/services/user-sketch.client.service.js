'use strict';

angular.module('users').service('UserSketchService', function ($http) {

    var service = this;

    service.getUserSketchs = function (userID) {

        return $http({
            url: '../api/sketchpad/' + userID,
            method: 'GET'
        })
    }

    service.getUser = function (userID) {
        return $http({
            url: '../api/readusers/' + userID,
            method: 'GET'
        })
    }
    return service;
})