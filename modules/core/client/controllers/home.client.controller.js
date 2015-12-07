'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication','fgDelegate',"$timeout",
  '$state', 'HomeSketchService',
  function ($scope, Authentication, fgDelegate, $timeout, $state, HomeSketchService) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    HomeSketchService.getAllSketchs().then(function(res) {
      $scope.sketchList = res.data;
    })

    $scope.stickyOrUnsticky = function (sketch) {
      if (sketch.sticky) {
        sketch.sticky = false;
        var data = {
          sketch: sketch
        }
        HomeSketchService.unsticky(data).success(function (res) {
          $state.reload();
        })

      } else {
        sketch.sticky = true;
        var data = {
          sketch: sketch
        }
        HomeSketchService.sticky(data).success(function (res) {
          $state.reload();
        });
      }

    }



    $scope.goToSketchNew = function() {
      $state.go('sketch-create')
    }

    $scope.goToComment = function(id) {
      $state.go('sketch-comment', {
        sketchId: id
      });
    }

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
