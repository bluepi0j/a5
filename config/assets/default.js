/**
 * Created by Haoan Wang on 15/11/18.
 */

module.exports = {
    client: {
        lib: {
            css: [
                'node-modules/bootstrap/dist/css/bootstrap.css',
                'node-modules/bootstrap/dist/css/bootstrap-theme.css'
            ],
            js: [
                'node-modules/angular/angular.js',
                //'public/lib/angular-resource/angular-resource.js',
                'node-modules/angular-animate/angular-animate.js',
                'node-modules/angular-messages/angular-messages.js',
                'node-modules/angular-ui-router/release/angular-ui-router.js',
                //'public/lib/angular-ui-utils/ui-utils.js',
                'node-modules/angular-bootstrap/ui-bootstrap-tpls.js',
                'node-modules/angular-file-upload/angular-file-upload.js',
                'node-modules/owasp-password-strength-test/owasp-password-strength-test.js'
            ],
            tests: ['node-modules/angular-mocks/angular-mocks.js']
        },
        css: [
            'modules/*/client/css/*.css'
        ],
        less: [
            'modules/*/client/less/*.less'
        ],
        sass: [
            'modules/*/client/scss/*.scss'
        ],
        js: [
            'modules/core/client/app/config.js',
            'modules/core/client/app/init.js',
            'modules/*/client/*.js',
            'modules/*/client/**/*.js'
        ],
        views: ['modules/*/client/views/**/*.html'],
        templates: ['build/templates.js']
    },
    server: {
        allJS: ['server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
        models: 'modules/*/server/models/**/*.js',
        routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
        sockets: 'modules/*/server/sockets/**/*.js',
        config: 'modules/*/server/config/*.js',
        policies: 'modules/*/server/policies/*.js',
        views: 'modules/*/server/views/*.html'
    }
};
