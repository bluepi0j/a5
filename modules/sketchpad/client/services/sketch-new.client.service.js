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

    return service;
})