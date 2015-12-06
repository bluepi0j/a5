'use strict';

var notiList = [];
var popedList = [];
angular.module('core').controller('NotificationController', ['$scope', '$state', 'Authentication',
    'toaster', '$interval', 'NotificationService',
    function ($scope, $state, Authentication, toaster, $interval, NotificationService) {
        // Expose view variables
        $scope.$state = $state;
        $scope.authentication = Authentication;



        //var inA = function(item, list) {
        //    for (var i = 0; i < list.length; i++) {
        //        if (item._id == list[i]._id) {
        //            return true;
        //        }
        //    }
        //    return false
        //}

        //$scope.pop = function(){
        //  console.log("asdas");
        //  toaster.pop('success', "title", "text");
        //};
        ////
        //NotificationService.getNotification().success(function(res) {
        //    console.log(res)
        //})

        $scope.checkNoti = function() {
            if (Authentication.user) {
                NotificationService.getNotification().success(function(res) {
                    if (res.length != 0) {
                        var helperList = [];
                        notiList = res;
                        for (var i = 0; i < popedList.length;i++ ){
                            if(notiList.indexOf(popedList[i])<0){
                                helperList.push(popedList[i]);
                            }
                        }
                        while (notiList.length != 0) {
                            var item = notiList.pop();
                            toaster.pop('success', "Comment", 'There is one comment for your (' + item.title + ')',
                                5000, 'trustedHtml', function(toaster) {
                                console.log("test");
                                $state.go("sketch-comment", {
                                    sketchId: item._id,
                                });
                                return true;
                            });

                            popedList.push(item);
                        }
                        for (i = 0; i < popedList.length; i++){
                            if (helperList.indexOf(popedList[i])>=0){
                                popedList.slice(i,i+1);
                                i--;
                            }
                        }

                    }
                })
            }
        }

        $interval($scope.checkNoti, 9000);


    }
]);
