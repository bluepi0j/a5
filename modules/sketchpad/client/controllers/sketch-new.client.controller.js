'use strict';

angular.module('sketch').controller('SketchNewController', ['$scope', 'Authentication',
  'FileUploader', 'SketchNewService',
  function ($scope, Authentication, FileUploader, SketchNewService) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.title = undefined;

    //var dataURLToBlob = function(dataURL) {
    //  var BASE64_MARKER = ';base64,';
    //  if (dataURL.indexOf(BASE64_MARKER) == -1) {
    //    var parts = dataURL.split(',');
    //    var contentType = parts[0].split(':')[1];
    //    var raw = decodeURIComponent(parts[1]);
    //
    //    return new Blob([raw], {type: contentType});
    //  }
    //
    //  var parts = dataURL.split(BASE64_MARKER);
    //  var contentType = parts[0].split(':')[1];
    //  var raw = window.atob(parts[1]);
    //  var rawLength = raw.length;
    //
    //  var uInt8Array = new Uint8Array(rawLength);
    //
    //  for (var i = 0; i < rawLength; ++i) {
    //    uInt8Array[i] = raw.charCodeAt(i);
    //  }
    //
    //  return new Blob([uInt8Array], {type: contentType});
    //}


    $scope.save = function() {
      $scope.canvas = document.getElementById('pwCanvasMain');
      var dataURL = $scope.canvas.toDataURL();
      //$scope.bolb = dataURLToBlob(dataURL);
      var data = {
        dataURL: dataURL,
        title: $scope.title
      }

      SketchNewService.saveSketch(data);
      //$http.post('api/users/picture', JSON.stringify({dataURL:dataURL}));
      //$scope.uploader.uploadAll();
    }
    
    $scope.undo = function () {
      $scope.version--;
    }





  }
]);
