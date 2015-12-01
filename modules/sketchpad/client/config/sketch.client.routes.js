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
        url: '/sketch/comment',
        templateUrl: 'modules/users/client/views/settings/edit-profile.client.view.html'
      });

  }
]);
