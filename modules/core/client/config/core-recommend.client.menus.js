'use strict';

angular.module('core.sketch').run(['Menus',
    function (Menus) {
        Menus.addMenuItem('topbar', {
            title: 'Recommend',
            state: 'sketch-recommend',
            roles: ['admin', 'superAdmin','user']
        });
    }
]);
