/// <reference path="..\..\node_modules\definitely-typed-angular\angular.d.ts" />
/// <reference path="app.route.ts" />

// Declare app level module
((): void => {
    angular.module('TaskMgrApp.services', []);
    angular.module('TaskMgrApp.directives', []);

    angular.module('TaskMgrApp.controllers', ['TaskMgrApp.services']);

    angular.module('TaskMgrApp.filters', []);

    var app = angular.module("TaskMgrApp", [
        'ngRoute',
        'ngAnimate',
        'ngMaterial',
        'toastr',
        'TaskMgrApp.controllers',
        'TaskMgrApp.services',
        'TaskMgrApp.directives',
        'TaskMgrApp.version',
        'TaskMgrApp.filters'
    ]);
    app.config(TaskMgrApp.Routes.configureRoutes);
})();