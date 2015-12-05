'use strict';

angular.module('core.sketch').run(['Menus',
    function (Menus) {
        Menus.addMenuItem('topbar', {
            title: 'Recommend',
            state: 'user-recommend',
            roles: ['admin', 'superAdmin','user']
        });
    }
]);
