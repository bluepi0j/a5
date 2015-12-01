'use strict';

angular.module('sketch').controller('SketchNewController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.animationsEnabled = true;




  }
]);
