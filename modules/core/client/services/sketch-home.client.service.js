'use strict';

angular.module('core').service('HomeSketchService', function ($http) {

    var service = this;


    service.getAllSketchs = function () {
        return $http({
            url: '../api/sketchpad/showall',
            method: 'GET'
        })
    }

    service.sticky = function (data) {
        return $http({
            url: '../api/sketchpad/sketch/sticky',
            method: 'PUT',
            data: JSON.stringify(data)
        })
    }

    service.unsticky = function (data) {
        return $http({
            url: '../api/sketchpad/sketch/unsticky',
            method: 'PUT',
            data: JSON.stringify(data)
        })
    }


    return service;
})