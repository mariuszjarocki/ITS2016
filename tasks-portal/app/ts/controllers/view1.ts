/// <reference path="..\..\..\node_modules\definitely-typed-angular\angular.d.ts" />
/// <reference path="../services/tasks.service.ts" />

'use strict';
import TaskStatus = TaskMgrApp.Models.TaskStatusEnum;
import TaskType = TaskMgrApp.Models.TaskTypeEnum;

module TaskMgrApp.Controllers {
  export class View1Ctrl {

    public tasks: Task[];
    public tasksToDo: Task[];
    public tasksDone: Task[];
    public tasksInProgress: Task[];
    public tasksUnresolved: Task[];

    static $inject = ['TasksService'];
    constructor(private tasksService: TaskMgrApp.Services.ITasksService) {
      this.loadTasksList();
    }

    private loadTasksList = () => {

      var promise = this.tasksService.getTasks();
      promise.then(callbackArg => {
        this.tasks = callbackArg.data.tasks;
        this.tasksDone = this.tasks.filter((value, index, array) => {
          return value.status == TaskStatus.CLOSED;
        });
        this.tasksToDo = this.tasks.filter((value, index, array) => {
          return value.status == TaskStatus.OPEN;
        });
        this.tasksInProgress = this.tasks.filter((value, index, array) => {
          return value.status == TaskStatus.INPROGRESS;
        });
        this.tasksUnresolved = this.tasks.filter((value, index, array) => {
          return value.status == TaskStatus.UNRESOLVED;
        });
      });
    }
  }

  angular.module('TaskMgrApp.controllers').controller('View1Ctrl', View1Ctrl);
}


