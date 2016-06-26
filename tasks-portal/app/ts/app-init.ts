/// <reference path="..\..\node_modules\definitely-typed-angular\angular.d.ts" />
/// <reference path="app.route.ts" />

// Declare app level module 
((): void => {
    angular.module('TaskMgrApp.services', []);
    angular.module('TaskMgrApp.directives', []);

    angular.module('TaskMgrApp.controllers', ['TaskMgrApp.services']);

    var app = angular.module("TaskMgrApp", [
        'ngRoute',
        'ngAnimate',
        'toastr',
        'ui.bootstrap',
        'xeditable',
        'TaskMgrApp.controllers',
        'TaskMgrApp.services',
        'TaskMgrApp.directives',
        'TaskMgrApp.version'
    ]);
    app.config(TaskMgrApp.Routes.configureRoutes);
    app.run(function (editableOptions) {
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
    });
})();