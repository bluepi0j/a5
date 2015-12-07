'use strict';

angular.module('sketch').controller('SketchNewController', ['$scope', 'Authentication',
    'FileUploader', 'SketchNewService', '$state','$window',
    function ($scope, Authentication, FileUploader, SketchNewService, $state, $window) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        $scope.title = undefined;

        $scope.save = function () {
            $scope.canvas = document.getElementById('pwCanvasMain');
            var dataURL = $scope.canvas.toDataURL();

            var data = {
                dataURL: dataURL,
                title: $scope.title
            }

            SketchNewService.saveSketch(data).success(function (res) {
                if (res.message == "Success") {
                    //$state.go('home');
                    $window.location.href = '/';
                    $state.reload();
                }
            });

        }

        $scope.undo = function () {
            $scope.version--;
        }


    }
]);
