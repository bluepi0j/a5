'use strict';

angular.module('users').service('UserCollectionsService', function ($http) {

    var service = this;

    service.collect = function (data) {
        return $http({
            url: '../api/sketchpad/collection/collect',
            method: 'PUT',
            data: JSON.stringify(data)
        })
    };

    service.showCollections = function () {

        return $http({
            url: '../api/sketchpad/collection/showcollection',
            method: 'GET'
        })
    }
    return service;
})



//app.route('/api/sketchpad/collection/collect').put(sketchpad.collect);
//app.route('/api/sketchpad/collection/showcollection').get(sketchpad.myCollection);