'use strict';

angular.module('sketch').service('SketchSearchService', function ($http) {

    var service = this;

    service.searchUser = function (searchstring) {
        if (searchstring) {
            var searchdata = searchstring.replace(/\s/g, '');
        }

        return $http({
            url: '../api/search/user/' + searchdata,
            method: 'GET'
        })
    }

    service.searchTitle = function (searchstring) {
        if (searchstring) {
            var searchdata = searchstring.replace(/\s/g, '');
        }

        $http.put('../api/sketchpad/recommend/addinterest/' + searchdata, {});

        return $http({
            url: '../api/search/title/' + searchdata,
            method: 'GET'
        })
    }


    return service;
})