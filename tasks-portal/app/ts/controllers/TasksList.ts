/// <reference path="..\..\..\node_modules\definitely-typed-angular\angular.d.ts" />
'use strict';
module TaskMgrApp.Controllers {
    export class TasksListController {
        tasks: Models.Task[];

        static $inject = ['TasksService'];
        constructor(private tasksService: Services.ITasksService) {
            this.loadTasks();
        }

        loadTasks = () => {
            this.tasksService.getTasks().then(response => {
                this.tasks = response.data.tasks;
            });
        }
    }

    angular.module('TaskMgrApp.controllers').controller('TasksListController', TasksListController);
}




