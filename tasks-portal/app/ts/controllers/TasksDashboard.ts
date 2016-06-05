/// <reference path="..\..\..\node_modules\definitely-typed-angular\angular.d.ts" />
/// <reference path="..\..\..\node_modules\definitely-typed-angular-ui-bootstrap\angular-ui-bootstrap.d.ts" />
/// <reference path="../services/tasks.service.ts" />

'use strict';
import TaskStatus = TaskMgrApp.Models.TaskStatusEnum;
import TaskType = TaskMgrApp.Models.TaskTypeEnum;

module TaskMgrApp.Controllers {
  export class TasksDashboardController {

    public tasks: Task[];
    public tasksToDo: Task[];
    public tasksDone: Task[];
    public tasksInProgress: Task[];
    public tasksUnresolved: Task[];
    public selectedTask: Task;

    static $inject = ['TasksService', '$uibModal'];
    constructor(private tasksService: TaskMgrApp.Services.ITasksService, private $uibModal: angular.ui.bootstrap.IModalService) {
      this.loadTasksList();
    }

    public setSelectedTask = (task: TaskMgrApp.Models.Task) => {
      this.selectedTask = task;
      this.openPopup();
    }

    private openPopup = () => {
      var modalInstance = this.$uibModal.open({
        templateUrl: 'views/taskPopup.html',
        controller: 'EditTaskModalController',
        controllerAs: 'vm',
        size: 'lg',
        resolve: {
          task: this.selectedTask
        }
      });
      modalInstance.result.then((updatedTask: Task) => {
        this.tasksService.updateTask(updatedTask)
        .then(arg => {
          console.log(arg);
        });
      },
      () => {
        console.log('Modal dismissed at: ' + new Date());
      });
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

  angular.module('TaskMgrApp.controllers').controller('TasksDashboardController', TasksDashboardController);
}


