'use strict';

angular.module('sketch').service('SketchCommentService', function ($http) {

    var service = this;

    service.getOneSketchs = function (sketchId) {
        return $http({
            url: '../api/sketchpad/' + sketchId,
            method: 'GET'
        })
    }
    return service;
})