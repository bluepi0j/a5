'use strict';

// Setting up route
angular.module('sketch').config(['$stateProvider',
    function ($stateProvider) {
        // Users state routing
        $stateProvider
            .state('sketch-create', {
                url: '/sketch/create',
                templateUrl: 'modules/sketchpad/client/views/sketch-new.client.view.html',
                data: {
                    roles: ['user', 'admin']
                }
            })
            .state('sketch-comment', {
                url: '/sketch/comment/:sketchId',
                templateUrl: 'modules/sketchpad/client/views/sketch-comment.client.view.html'
            })
            .state('sketch-search', {
                url: '/sketch/search',
                templateUrl: 'modules/sketchpad/client/views/sketch-search.client.view.html',
                params: {
                    search: null,
                    method: null
                }

            });

    }
]);
