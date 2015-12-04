'use strict';

angular.module('sketch').controller('SketchCommentController', ['$scope', 'Authentication',
    'FileUploader', 'SketchNewService', '$state','$window',
    function ($scope, Authentication, FileUploader, SketchNewService, $state, $window) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        $scope.title = undefined;
    }
]);
