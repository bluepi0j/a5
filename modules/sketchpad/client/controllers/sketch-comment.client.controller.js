'use strict';

angular.module('sketch').controller('SketchCommentController', ['$scope', 'Authentication',
    'FileUploader', 'SketchNewService', '$state','$window', 'SketchCommentService', '$stateParams',
    function ($scope, Authentication, FileUploader, SketchNewService, $state, $window, SketchCommentService, $stateParams) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        $scope.title = undefined;
        SketchCommentService.getOneSketchs($stateParams.sketckId).success(function(res){
        	//
        	$scope.sketch = res.data
        });
    }
]);
