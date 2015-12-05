'use strict';

angular.module('sketch').controller('SketchCommentController', ['$scope', 'Authentication',
    'SketchNewService', '$state','$window', 'SketchCommentService', '$stateParams',
    function ($scope, Authentication, SketchNewService, $state, $window, SketchCommentService, $stateParams) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        $scope.title = undefined;

        SketchCommentService.getOneSketch($stateParams.sketchId).success(function(res){
        	$scope.sketch = res;
        });

        SketchCommentService.getAveRate($stateParams.sketchId).success(function(res) {
            console.log(res);
            $scope.aveRate = res;
        })


    }
]);
