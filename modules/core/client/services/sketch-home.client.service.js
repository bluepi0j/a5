'use strict';

angular.module('core').service('HomeSketchService', function ($http) {

    var service = this;
    service.url = "http://127.0.0.1:3000";


    service.getAllSketchs = function () {
        return $http({
            url: service.url + '/api/sketchpad/showall',
            method: 'GET'
        })
    }



    return service;
})