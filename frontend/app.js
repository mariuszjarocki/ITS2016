/**
 * Created by Przemek on 26.05.2016.
 */
define(["angularAMD", "ui-router"], function (angularAMD) {

    var app = angular.module('app', ["ui.router"]);

    app.config([
        '$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state("chart", angularAMD.route({
                    url: "/charts",
                    templateUrl: "frontend/charts/chart.html",
                    controller: "chartCtrl",
                    controllerUrl: "charts/chartController"
                }));
            $stateProvider
                .state("home", angularAMD.route({
                    url: "/home",
                    templateUrl: "frontend/home.html",
                    controller: "homeCtrl",
                    controllerUrl: "homeController"
                }));
            $stateProvider
                .state("users", angularAMD.route({
                    url: "/users",
                    templateUrl: "frontend/users/users.html",
                    controller: "usersCtrl",
                    controllerUrl: "users/usersController"
                }));
            $urlRouterProvider
                .otherwise("/home");
        }
    ]);

    return angularAMD.bootstrap(app);
});