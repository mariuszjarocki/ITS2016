/// <reference path="..\..\..\node_modules\definitely-typed-angular\angular.d.ts" />
/// <reference path="../services/users.service.ts" />
/// <reference path="../services/tasks.service.ts" />
/// <reference path="../typings/angular-toastr.d.ts" />
/// <reference path="../typings/angular-material.d.ts" />


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


        static $inject = ['TasksService', 'toastr', '$mdDialog', '$mdMedia'];
        /* @ngInject */
        constructor(private tasksService: TaskMgrApp.Services.ITasksService,
            private toastr: angular.toastr.IToastrService,
            private $mdDialog: angular.material.IDialogService,
            private $mdMedia: angular.material.IMedia) {
            this.loadTasksList();
        }

        public setSelectedTask = (task: TaskMgrApp.Models.Task) => {
            this.selectedTask = task;
            this.openPopup();
        }

        private openPopup = () => {
            var opts: angular.material.IDialogOptions = {
                controller: EditTaskModalController,
                controllerAs: 'vm',
                templateUrl: 'views/taskPopup.html',
                clickOutsideToClose: true,
                fullscreen: false,
                locals: {
                    task: this.selectedTask
                },
                openFrom: {
                    top: -500,
                    width: 300,
                    height: 800
                },
                closeTo: {
                    left: 1500
                }
            };

            this.$mdDialog.show(opts)
                .then((updatedTask: Task) => {
                    this.tasksService.updateTask(updatedTask).then(arg => {
                        this.loadTasksList();
                        this.toastr.success("Successfully saved Task.", "Saved");
                    });
                }),
                (reason) => {
                    console.log('Modal dismissed at: ' + new Date() + ". Reason:");
                    console.log(reason);
                };
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

