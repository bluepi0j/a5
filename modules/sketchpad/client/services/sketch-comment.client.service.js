'use strict';

angular.module('sketch').service('SketchCommentService', function ($http) {

    var service = this;
    service.url = "http://127.0.0.1:3000";


    service.getOneSketchs = function (sketckId) {
        return $http({
            url: service.url + '/api/sketchpad/' + sketckId,
            method: 'GET'
        })
    }
    return service;
})