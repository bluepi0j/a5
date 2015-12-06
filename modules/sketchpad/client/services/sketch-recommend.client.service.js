'use strict';

angular.module('sketch').service('SketchRecommendService', function ($http) {

    var service = this;

    service.getUserRecommend = function () {
        return $http({
            url: '..api/sketchpad/recommend',
            method: 'GET',
        })
    }

    return service;
})