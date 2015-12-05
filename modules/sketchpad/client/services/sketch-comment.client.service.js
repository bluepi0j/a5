'use strict';

angular.module('sketch').service('SketchCommentService', function ($http) {

    var service = this;

    service.getOneSketch = function (sketchId) {
        return $http({
            url: '../api/comments/show/' + sketchId,
            method: 'GET'
        })
    }
    return service;
})