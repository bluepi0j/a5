'use strict';

angular.module('core').service('NotificationService', function ($http) {

    var service = this;


    service.getNotification = function () {
        return $http({
            url: '../api/sketchpad/notification/checknew',
            method: 'GET'
        })
    }

    return service;
})