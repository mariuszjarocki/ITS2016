/// <reference path="..\..\..\node_modules\definitely-typed-angular\angular.d.ts" />
var myApp;
(function (myApp) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var MainMenuController = (function () {
            function MainMenuController($location) {
                var _this = this;
                this.$location = $location;
                this.isActive = function (viewLocation) {
                    return viewLocation === _this.$location.path();
                };
            }
            MainMenuController.$inject = ['$location'];
            return MainMenuController;
        })();
        Controllers.MainMenuController = MainMenuController;
        angular
            .module('myApp')
            .controller('MainMenuController', MainMenuController);
    })(Controllers = myApp.Controllers || (myApp.Controllers = {}));
})(myApp || (myApp = {}));
//# sourceMappingURL=app-concat.js.map