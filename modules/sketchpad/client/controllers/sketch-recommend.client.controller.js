'use strict';

angular.module('sketch').controller('SketchRecommmendController', ['$scope', 'Authentication',
    '$state','$window', '$stateParams', '$timeout', 'fgDelegate', 'SketchRecommendService',
    function ($scope, Authentication, $state, $window, $stateParams,
              $timeout, fgDelegate, SketchRecommendService) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        $scope.title = undefined;

        SketchRecommendService.getUserRecommend().success(function(res) {
            console.log(res);
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
