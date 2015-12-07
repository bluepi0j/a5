'use strict';

var notiList = [];
var popedList = [];
angular.module('core').controller('NotificationController', ['$scope', '$state', 'Authentication',
    'toaster', '$interval', 'NotificationService',
    function ($scope, $state, Authentication, toaster, $interval, NotificationService) {
        // Expose view variables
        $scope.$state = $state;
        $scope.authentication = Authentication;



        var inA = function(item, list) {
            for (var i = 0; i < list.length; i++) {
                if (item._id == list[i]._id) {
                    return i;
                }
            }
            return -1
        }


        /**
         * this function call every two second to check notificaiton
         */
        $scope.checkNoti = function() {
            if (Authentication.user) {
                NotificationService.getNotification().success(function(res) {
                    if (res.length != 0) {
                        var helperList = [];
                        notiList = res;

                        for (var i = 0; i < popedList.length; i++ ){
                            if(inA(popedList[i], notiList) < 0){
                                helperList.push(popedList[i]);
                            }else{
                                var done = inA(popedList[i], notiList)
                                notiList.splice(done, done+1);
                            }
                        }
                        while (notiList.length != 0) {
                            var item = notiList.pop();
                            toaster.pop('success', "Comment", 'There is one comment for your (' + item.title + ')',
                                25000, 'trustedHtml', function(toaster) {
                                //console.log("test");
                                $state.go("sketch-comment", {
                                    sketchId: item._id,
                                });
                                return true;
                            });

                            popedList.push(item);
                        }
                        for (var j = 0; j < popedList.length; j++){
                            console.log("last for loop one iteration");
                            if (inA(popedList[j], helperList) >= 0){
                                popedList.splice(j, j+1);
                                j--;
                            }
                        }

                    }
                })
            }
        }

        $interval($scope.checkNoti, 2000);


    }
]);
