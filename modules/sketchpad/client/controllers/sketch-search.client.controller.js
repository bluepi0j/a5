'use strict';

angular.module('sketch').controller('SketchSearchController', ['$scope', 'Authentication', 'SketchNewService',
    '$state','$window', 'SketchSearchService', '$stateParams', '$timeout', 'fgDelegate',
    function ($scope, Authentication, SketchNewService, $state, $window, SketchSearchService, $stateParams,
              $timeout, fgDelegate) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        $scope.title = undefined;

        var search = function() {
            $scope.search = $stateParams.search
           if ($stateParams.method == "title") {
               SketchSearchService.searchTitle($stateParams.search).success(function (res) {
                   $scope.sketchList = res;

                   if (res.length == 0) {
                       $scope.message = "No Matches Found!";
                   }
               });
           } else {
               SketchSearchService.searchUser($stateParams.search).success(function (res) {
                   $scope.sketchList = res;
                   if (res.length == 0) {
                       $scope.message = "No Matches Found!";
                   }
               });
           }
        }
        search();


        $scope.searchUser = function() {
            $state.go('sketch-search', {
                search:$scope.search,
                method:"user"
            });
        }

        $scope.searchSketch = function() {
            $state.go('sketch-search', {
                search:$scope.search,
                method:"title"
            });
        }

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
