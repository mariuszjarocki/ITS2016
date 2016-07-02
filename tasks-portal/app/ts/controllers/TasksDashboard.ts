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
        public isBusy: boolean;

        public statuses = TaskMgrApp.Models.TaskStatusesItems;
        public types = TaskMgrApp.Models.TaskTypesItems;

        static $inject = ['TasksService', 'toastr', '$mdDialog'];
        constructor(private tasksService: TaskMgrApp.Services.ITasksService,
            private toastr: angular.toastr.IToastrService,
            private $mdDialog: angular.material.IDialogService) {
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
                    this.isBusy = true;
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

        getTextFromEnum = (enumItems: Models.IDropdownItem[], enumValue: number) => {
            for (let item of enumItems) {
                if (item.value === enumValue) {
                    return item.text;
                }
            }
            return '';
        }

        getDate = (dateString: string) => {
            return new Date(dateString);
        }

        private loadTasksList = () => {
            this.isBusy = true;
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
                this.isBusy = false;
            });
        }
    }

    angular.module('TaskMgrApp.controllers').controller('TasksDashboardController', TasksDashboardController);
}


