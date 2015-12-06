'use strict';

angular.module('users').controller('UserCollectionsController', ['$scope', 'Authentication', '$state','$window',
    '$stateParams', 'UserCollectionsService',
    '$timeout','fgDelegate',
    function ($scope, Authentication, $state, $window,
              $stateParams, UserCollectionsService, $timeout, fgDelegate) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        UserCollectionsService.showCollections().success(function (res) {
            console.log(res);
            if (res.length == 0) {
                $scope.message = "No Sketch!"
            }

            $scope.sketchList = res;
        })


        $scope.goToComment = function(id) {
            $state.go('sketch-comment', {
                sketchId: id
            });
        }

        $scope.goToUser = function(id) {
            $state.go('user-sketch', {
                userId:id
            })
        }

        var flow;
        /**
         * ====== important ========
         * make sure ngRepeat is done, it is better to use ngFlowGrid directive
         * otherwise, u need to make sure ng-repeat is done,
         */
        $timeout( function(){
            console.log("create flow")
            flow = fgDelegate.new({
                name:"demoGird",
                minItemWidth:200,
                container: document.getElementById("demogrid"), // must give a container
                itemSelector:".flowGridItem", // item's className
            })
        },100);
    }
]);
