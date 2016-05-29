/// <reference path="..\..\node_modules\definitely-typed-angular\angular.d.ts" />
/// <reference path="..\..\node_modules\definitely-typed-angular\angular-route.d.ts" />

module TaskMgrApp {
    export class Routes {
        static $inject = ["$routeProvider", "$locationProvider"];
        static configureRoutes($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider) {
            $locationProvider.hashPrefix('!');
            var viewsFolder = "views/";
            $routeProvider.when('/view1', {
                templateUrl: viewsFolder + 'view1.html',
                controller: 'View1Ctrl'
            });
            $routeProvider.when('/view2', {
                templateUrl: viewsFolder + 'view2.html',
                controller: 'View2Ctrl'
            });

            $routeProvider.otherwise({ redirectTo: '/view1' });
        }
    }
}