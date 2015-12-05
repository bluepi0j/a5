'use strict';

angular.module('core.sketch').run(['Menus',
    function (Menus) {
        Menus.addMenuItem('topbar', {
            title: 'My Sketch',
            state: 'user-sketch',
            roles: ['*']
        });
    }
]);
