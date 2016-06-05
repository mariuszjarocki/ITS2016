/// <reference path="..\..\..\node_modules\definitely-typed-angular\angular.d.ts" />
/// <reference path="..\models\Task.ts" />


module TaskMgrApp.Directives {
    export class TasksDirective implements ng.IDirective {
        restrict = 'AE';
        scope = {
            tasks: '=',
            selectedTask: '=',
            setSelectedTask: '&'
        }
        templateUrl = 'views/tasksDirective.html';
        
        constructor() {
        }

        link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: any) => {
            // console.log(scope);
        }

        static factory(): ng.IDirectiveFactory {
            const directive = () => new TasksDirective();
            return directive;
        }
    }

    angular.module('TaskMgrApp.directives').directive('tasksDirective', TasksDirective.factory());
}