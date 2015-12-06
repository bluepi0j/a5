'use strict';

angular.module('sketch').controller('SketchCommentController', ['$scope', 'Authentication',
    'SketchNewService', '$state', '$window', 'SketchCommentService', '$stateParams',
    function ($scope, Authentication, SketchNewService, $state, $window, SketchCommentService, $stateParams) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        $scope.title = undefined;
        $scope.max = 5;


        SketchCommentService.getOneSketch($stateParams.sketchId).success(function (res) {
            $scope.sketch = res;
        });


        SketchCommentService.getAllComment($stateParams.sketchId).success(function (res) {
            console.log(res);
            $scope.comments = res;
        })

        SketchCommentService.getMyRate($stateParams.sketchId).success(function (res) {
            if (res.length == 0) {
                $scope.alreadyRated = false;
                $scope.myRate = 0;
            } else {
                $scope.alreadyRated = true;
                $scope.myRate = res[0].rating;
            }
        })

        $scope.goToUser = function(id) {
            $state.go('user-sketch', {
                userId:id
            })
        }

        $scope.hoveringOver = function (value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);
        };

        $scope.saveRate = function () {
            var data = {rate: $scope.myRate};
            SketchCommentService.saveNewRate(data, $stateParams.sketchId).success(function (res) {
                $scope.message = "Rate Success!";
                $scope.alreadyRated = true;
            })
        }

        $scope.addNewComment = function () {
            var data = {text: $scope.text};
            SketchCommentService.addNewComment(data, $stateParams.sketchId).success(function (res) {
                $state.reload();
            })
        }

    }
]);
