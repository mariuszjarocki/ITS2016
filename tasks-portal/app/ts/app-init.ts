/// <reference path="..\..\node_modules\definitely-typed-angular\angular.d.ts" />
/// <reference path="app.route.ts" />

// Declare app level module which depends on views, and components
angular.module('TaskMgrApp', [
  'ngRoute',
  'TaskMgrApp.view1',
  'TaskMgrApp.view2',
  'TaskMgrApp.version'
]).
  config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({ redirectTo: '/view1' });
  }]);



((): void => {
  angular.module('TaskMgrApp.controllers', []);
  angular.module('TaskMgrApp.services', []);
  angular.module('TaskMgrApp.directives', []);
  var app = angular.module("TaskMgrApp", [
    'ngRoute',
    'TaskMgrApp.controllers',
    'TaskMgrApp.services',
    'TaskMgrApp.directives',
    'TaskMgrApp.version'
  ]);
  app.config(TaskMgrApp.Routes.configureRoutes);
})();