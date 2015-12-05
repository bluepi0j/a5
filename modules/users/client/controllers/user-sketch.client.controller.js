'use strict';

angular.module('sketch').controller('UserSketchController', ['$scope', 'Authentication',
    'FileUploader', 'SketchNewService', '$state','$window', '$stateParams',
    function ($scope, Authentication, FileUploader, SketchNewService, $state, $window, $stateParams) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        $scope.title = undefined;

    }
]);
