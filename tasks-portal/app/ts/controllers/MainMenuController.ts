/// <reference path="..\..\..\node_modules\definitely-typed-angular\angular.d.ts" />

namespace myApp.Controllers {
    'use strict';

    export class MainMenuController {
        static $inject: Array<string> = ['$location'];
        constructor(private $location: ng.ILocationService) { }

        public isActive = (viewLocation: string) => {
            return viewLocation === this.$location.path();
        };
    }

    angular
        .module('myApp')
        .controller('MainMenuController', MainMenuController);
}