'use strict';

angular.module('sketch').service('SketchCommentService', function ($http) {

    var service = this;

    service.getOneSketch = function (sketchId) {
        return $http({
            url: '../api/sketchpad/find/' + sketchId,
            method: 'GET'
        })
    }

    service.getMyRate = function (sketchId) {

        return $http({
            url: '../api/rating/show/' + sketchId,
            method: 'GET'
        })
    }

    service.saveNewRate = function (data, sketchId) {
        return $http({
            url: '../api/rating/save/' + sketchId,
            method: 'POST',
            data: JSON.stringify(data)
        })
    }

    service.getAllComment = function (sketchId) {
        return $http({
            url: '../api/comments/show/' + sketchId,
            method: 'GET'
        })
    }

     return service;
})