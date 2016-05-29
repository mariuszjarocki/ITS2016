/**
 * Created by Przemek on 26.05.2016.
 */
require.config({
    baseUrl: "frontend/",
    paths: {
        'require': '../node_modules/requirejs/require.js',
        'jquery': '../node_modules/jquery/dist/jquery',
        'timeline': 'js/timeline',
        'storyEmbed': '../node_modules/timelinejs/build/js/storyjs-embed',
        'angular': '../node_modules/angular/angular',
        'angular-route': '../node_modules/angular-route/angular-route',
        'ui-router': "../node_modules/angular-ui-router/release/angular-ui-router",
        'angularAMD': '../node_modules/angular-amd/angularAMD',
        'timeline-angular': '../node_modules/angular-timelinejs3/dist/js/ng-timeline',
        'moment': '../node_modules/moment/moment',
        'lodash': '../node_modules/lodash/lodash',
        'grid': '../node_modules/ag-grid/dist/ag-grid',
        'angular-bootstrap': '../node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls',
        'angular-animate': '../node_modules/angular-animate/angular-animate'
    },
    shim: {
        'timeline': ['jquery'],
        'timeline-angular': ['timeline', 'angular'],
        'storyEmbed': ['jquery'],
        'angular-route': ['angular'],
        'angularAMD': ['angular'],
        'ui-router': ['angular']
    },
    deps: ['app']
});