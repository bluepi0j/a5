'use strict';

angular.module('core.sketch').run(['Menus',
    function (Menus) {
        Menus.addMenuItem('topbar', {
            title: 'My Collections',
            state: 'user-collections',
            roles: ['admin', 'superAdmin','user']
        });
    }
]);
