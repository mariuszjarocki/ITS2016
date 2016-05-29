/// <reference path="..\..\..\node_modules\definitely-typed-angular\angular.d.ts" />

namespace TaskMgrApp.Controllers {
    'use strict';

    export class MainMenuController {
        static $inject: Array<string> = ['$location'];
        constructor(private $location: ng.ILocationService) { }

        public isActive = (viewLocation: string) => {
            return viewLocation === this.$location.path();
        };
    }

    angular
        .module('TaskMgrApp.controllers')
        .controller('MainMenuController', MainMenuController);
}