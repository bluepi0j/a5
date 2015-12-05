'use strict';

angular.module('core').service('HomeSketchService', function ($http) {

    var service = this;


    service.getAllSketchs = function () {
        return $http({
            url: '../api/sketchpad/showall',
            method: 'GET'
        })
    }


    return service;
})