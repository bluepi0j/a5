'use strict';

angular.module('sketch').service('SketchCommentService', function ($http) {

    var service = this;

    service.getOneSketch = function (sketchId) {
        return $http({
            url: '../api/sketchpad/find/' + sketchId,
            method: 'GET'
        })
    }

    service.getAveRate = function (sketchId) {

        return $http({
            url: '../api/rating/show/' + sketchId,
            method: 'GET'
        })
    }

    return service;
})