/// <reference path="..\..\..\node_modules\definitely-typed-angular\angular.d.ts" />
/// <reference path="../services/tasks.service.ts" />

'use strict';
module TaskMgrApp.Controllers {
  export class View1Ctrl {
    
    public tasks: Task[];
    
    static $inject = ['TasksService'];
    constructor(private tasksService: TaskMgrApp.Services.ITasksService) {
      this.loadTasksList();
    }

    private loadTasksList = () => {

      var promise = this.tasksService.getTasks();
      promise.then(callbackArg => {
        this.tasks = callbackArg.data.tasks;
      });
    }
  }

  angular.module('TaskMgrApp.controllers').controller('View1Ctrl', View1Ctrl);
}


