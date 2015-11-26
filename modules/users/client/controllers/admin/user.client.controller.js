'use strict';

angular.module('users.admin').controller('UserController', ['$scope', '$state', 'Authentication', 'userResolve',
    'FileUploader', 'AdminService', '$timeout', '$window','PasswordValidator',
    function ($scope, $state, Authentication, userResolve, FileUploader, AdminService, $timeout, $window, PasswordValidator) {
        $scope.authentication = Authentication;
        $scope.popoverMsg = PasswordValidator.getPopoverMsg();
        $scope.user = userResolve.data;
        $scope.isAdmin = undefined;
        $scope.imageURL = $scope.user.profileImageURL;
        $scope.uploader = new FileUploader({
            url: 'api/users/picture/' + $scope.user._id,
            alias: 'newProfilePicture',
            method: 'POST',
            onBeforeUploadItem: function (item) {
                item.formData.push({user: JSON.stringify($scope.user)});
            }
        });


        $scope.ifadmin = function () {
            if ($scope.user.roles.length == 2) {
                $scope.isAdmin = true;
            } else {
                $scope.isAdmin = false;
            }
        };

        $scope.ifadmin();

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
            $scope.picerror = response.message;
        };

        // Change user profile picture
        $scope.uploadProfilePicture = function () {
            // Clear messages
            $scope.success = $scope.picerror = null;

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

        $scope.changeAdmin = function() {
            $scope.isAdmin = !$scope.isAdmin;
        }

        $scope.update = function (isValid) {
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'userForm');

                return false;
            }

            var user = $scope.user;

            console.log($scope.isAdmin);
            if ($scope.user.roles.length != 3) {

                if ($scope.isAdmin) {

                    if (user.roles.length == 1) {
                        user.roles = ["user", "admin"];
                    }
                } else {
                    if (user.roles.length == 2) {
                        user.roles = ["user"];
                    }
                }
            }

            AdminService.updateUser(user._id, user).success(function (a, b) {
                $state.go('admin.user', {
                    userId: user._id
                });
            }).error(function (errorResponse) {
                $scope.infoerror = errorResponse.data.message;
            })

        };

        $scope.cancelBack = function () {
            $window.history.back();
        }

        // Change user password
        $scope.changeUserPassword = function (isValid) {
            $scope.success = $scope.passworderror = null;

            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'passwordForm');

                return false;
            }
            var data = {passwordDetails: $scope.passwordDetails, user: $scope.user};

            AdminService.changePassword($scope.user._id, data).success(function (response) {
                // If successful show success message and clear form
                $scope.$broadcast('show-errors-reset', 'passwordForm');
                $scope.success = true;
                $scope.passwordDetails = null;
            }).error(function (response) {
                $scope.passworderror = response.message;
            });
        };
    }
]);
