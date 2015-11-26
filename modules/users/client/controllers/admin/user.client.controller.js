'use strict';

angular.module('users.admin').controller('UserController', ['$scope', '$state', 'Authentication', 'userResolve',
    'FileUploader', 'AdminService', '$timeout', '$window',
    function ($scope, $state, Authentication, userResolve, FileUploader, AdminService, $timeout, $window) {
        $scope.authentication = Authentication;
        $scope.user = userResolve.data;
        $scope.imageURL = $scope.user.profileImageURL
        $scope.uploader = new FileUploader({
            url: 'api/users/picture/' + $scope.user._id,
            alias: 'newProfilePicture',
            method: 'POST',
            onBeforeUploadItem: function (item) {
                item.formData.push({user: JSON.stringify($scope.user)});
            }
        });

        // Set file uploader image filter
        $scope.uploader.filters.push({
            name: 'imageFilter',
            fn: function (item, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });


        // Called after the user selected a new picture file
        $scope.uploader.onAfterAddingFile = function (fileItem) {
            if ($window.FileReader) {
                var fileReader = new FileReader();
                fileReader.readAsDataURL(fileItem._file);

                fileReader.onload = function (fileReaderEvent) {
                    $timeout(function () {
                        $scope.imageURL = fileReaderEvent.target.result;
                    }, 0);
                };
            }
        };


        // Called after the user has successfully uploaded a new picture
        $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
            // Show success message
            $scope.success = true;

            // Populate user object
            if ($scope.user._id == Authentication.user._id) {
                $scope.user = response;
                Authentication.user = response;
            } else {
                $scope.user = response;
            }

            // Clear upload buttons
            $scope.cancelUpload();
        };

        // Called after the user has failed to uploaded a new picture
        $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
            // Clear upload buttons
            $scope.cancelUpload();

            // Show error message
            $scope.error = response.message;
        };

        // Change user profile picture
        $scope.uploadProfilePicture = function () {
            // Clear messages
            $scope.success = $scope.error = null;

            // Start upload
            $scope.uploader.uploadAll();
        };

        // Cancel the upload process
        $scope.cancelUpload = function () {
            $scope.uploader.clearQueue();
            $scope.imageURL = $scope.user.profileImageURL;
        };

        $scope.remove = function (user) {
            console.log(user);

            if (confirm('Are you sure you want to delete this user?')) {
                if (user) {
                    AdminService.removeUser(user._id);

                    $scope.users.splice($scope.users.indexOf(user), 1);
                } else {
                    console.log($scope.user);
                    AdminService.removeUser($scope.user._id).success(function () {
                        $state.go('admin.users');
                    });

                }
            }
        };

        $scope.update = function (isValid) {
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'userForm');

                return false;
            }

            var user = $scope.user;
            AdminService.updateUser(user._id, user).success(function(a, b) {
                $state.go('admin.user', {
                    userId: user._id
                });
            }).error(function(errorResponse) {
                $scope.error = errorResponse.data.message;
            })

        };

        $scope.cancelBack = function () {
            $window.history.back();
        }
    }
]);
