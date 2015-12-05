'use strict';

angular.module('sketch').controller('SketchCommentController', ['$scope', 'Authentication',
    'SketchNewService', '$state', '$window', 'SketchCommentService', '$stateParams',
    function ($scope, Authentication, SketchNewService, $state, $window, SketchCommentService, $stateParams) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        $scope.title = undefined;
        $scope.max = 5;

        SketchCommentService.getOneSketch($stateParams.sketchId).success(function (res) {
            console.log(res);
            $scope.sketch = res;
        });

        SketchCommentService.getMyRate($stateParams.sketchId).success(function (res) {
            if (res.length == 0) {
                $scope.myRate = 0;
            } else {
                $scope.myRate = res[0].rating;
            }
        })

        $scope.hoveringOver = function (value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);
        };

        $scope.saveRate = function () {
            var data = {rate: $scope.myRate}
            SketchCommentService.saveNewRate(data, $stateParams.sketchId).success(function (res) {
                $scope.message = "Rate Success!";
            })
        }

    }
]);
