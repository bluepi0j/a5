'use strict';

angular.module('sketch').controller('SketchNewController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.canvas = document.getElementById('pwCanvasTmp');

    $scope.save = function() {
      var a = document.getElementById('pwCanvasMain');

      console.log(a);
      var dataURL = a.toDataURL();
      document.getElementById('canvasImg').src = dataURL;
    }



  }
]);
