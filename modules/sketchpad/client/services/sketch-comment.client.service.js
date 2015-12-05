'use strict';

angular.module('sketch').service('SketchCommentService', function ($http) {

    var service = this;

    service.getOneSketchs = function (sketckId) {
        return $http({
            url: '../api/sketchpad/' + sketckId,
            method: 'GET'
        })
    }
    return service;
})