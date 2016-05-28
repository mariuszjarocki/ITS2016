/// <reference path="../node_modules/definitely-typed-angular/angular.d.ts" />
declare namespace myApp.Controllers {
    class MainMenuController {
        private $location;
        static $inject: Array<string>;
        constructor($location: ng.ILocationService);
        isActive: (viewLocation: string) => boolean;
    }
}
