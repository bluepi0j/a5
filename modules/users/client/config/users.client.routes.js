'use strict';

// Setting up route
angular.module('users').config(['$stateProvider','$windowProvider',
  function ($stateProvider, $windowProvider) {
    // Users state routing
    $stateProvider
      .state('settings', {
        abstract: true,
        url: '/settings',
        templateUrl: 'modules/users/client/views/settings/settings.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('settings.profile', {
        url: '/profile',
        templateUrl: 'modules/users/client/views/settings/edit-profile.client.view.html'
      })
      .state('settings.password', {
        url: '/password',
        templateUrl: 'modules/users/client/views/settings/change-password.client.view.html'
      })
      .state('settings.picture', {
        url: '/picture',
        templateUrl: 'modules/users/client/views/settings/change-profile-picture.client.view.html'
      })
      .state('authentication', {
        abstract: true,
        url: '/authentication',
        templateUrl: 'modules/users/client/views/authentication/authentication.client.view.html'
      })
      .state('authentication.signup', {
        url: '/signup',
        templateUrl: 'modules/users/client/views/authentication/signup.client.view.html'
      })
      .state('authentication.signin', {
        url: '/signin?err',
        templateUrl: 'modules/users/client/views/authentication/signin.client.view.html'
      })
      .state('password', {
        abstract: true,
        url: '/password',
        template: '<ui-view/>'
      })
        .state('user-sketch', {
          url:'/user/sketch/:userId',
          templateUrl: 'modules/users/client/views/user-sketch.client.view.html',
          params: {
            userId: $windowProvider.$get().user._id,
          }
        })
        .state('user-collections', {
            url: '/user/collections/:userId',
            templateUrl: 'modules/users/client/views/user-collections.client.view.html',
            params: {
                userId: $windowProvider.$get().user._id,
            }
        });

  }
]);
