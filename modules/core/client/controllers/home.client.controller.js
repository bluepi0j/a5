'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication','fgDelegate',"$timeout",
  '$filter', '$state', 'HomeSketchService',
  function ($scope, Authentication, fgDelegate, $timeout, $filter, $state, HomeSketchService) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    HomeSketchService.getAllSketchs().then(function(res) {
      $scope.sketchList = res.data;
    })

    $scope.items = [
      {
        id:1,
        img:'http://placehold.it/300x600/E97452/fff',
        name:'Lorem ipsum dolor sit amet',
      },
      {
        id:2,
        img:'http://placehold.it/300x300/4C6EB4/fff',
        name:'Lorem ipsum dolor sit amet',
      },
      {
        id:3,
        img:'http://placehold.it/300x250/449F93/fff',
        name:'Lorem ipsum dolor sit amet',
      },
      {
        id:4,
        img:'http://placehold.it/200x320/936FBC/fff',
        name:'Lorem ipsum dolor sit amet',
      },
      {
        id:5,
        img:'http://placehold.it/400x500/D25064/fff',
        name:'Lorem ipsum dolor sit amet',
      },
      {
        id:6,
        img:'http://placehold.it/300x200/CF364A/fff',
        name:'Lorem ipsum dolor sit amet',
      },
      {
        id:7,
        img:'http://placehold.it/300x400/E59649/fff',
        name:'Lorem ipsum dolor sit amet',
      },
      {
        id:8,
        img:'http://placehold.it/350x500/75A0CC/fff',
        name:'Lorem ipsum dolor sit amet',
      },
      {
        id:9,
        img:'http://placehold.it/300x200/4296AD/fff',
        name:'Lorem ipsum dolor sit amet',
      },
      {
        id:10,
        img:'http://placehold.it/300x400/9FDBC7/fff',
        name:'Lorem ipsum dolor sit amet',
      },
      {
        id:11,
        img:'http://placehold.it/300x300/4E8EF7/fff',
        name:'Lorem ipsum dolor sit amet',
      },

    ]

    //$scope.pagedItems = $scope.items;
    //
    //$scope.figureOutItemsToDisplay = function () {
    //  $scope.filteredItems = $filter('filter')($scope.items, {
    //    $: $scope.search
    //  });
    //  $scope.filterLength = $scope.filteredItems.length;
    //  var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
    //  var end = begin + $scope.itemsPerPage;
    //  $scope.pagedItems = $scope.filteredItems.slice(begin, end);
    //};

    $scope.goToSketchNew = function() {
      $state.go('sketch-create')
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
