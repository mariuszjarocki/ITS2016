/// <reference path="..\..\..\node_modules\definitely-typed-angular\angular.d.ts" />
/// <reference path="../models/uimodels.ts" />
/// <reference path="..\Models\Task.ts" />

namespace TaskMgrApp.Controllers {
    'use strict';

    export class EditTaskModalController {

        public users: User[];
        public startDatePopup = {
            selectedDate: new Date()
        };

        public endDatePopup = {
            selectedDate: new Date()
        };

        public statuses = TaskMgrApp.Models.TaskStatusesItems;
        public types = TaskMgrApp.Models.TaskTypesItems;

        static $inject = ['$mdDialog', '$filter', 'task', 'UsersService'];
        constructor(private $mdDialog: angular.material.IDialogService, private $filter: ng.IFilterService, public task: Models.Task, private usersService: Services.IUsersService) {
            this.startDatePopup.selectedDate = new Date(this.task.startDate);
            this.endDatePopup.selectedDate = new Date(this.task.endDate);
            this.loadUsers();
        }

        /**
         * save
         */
        public save() {
            this.task.startDate = this.startDatePopup.selectedDate.toISOString();
            this.task.endDate = this.endDatePopup.selectedDate.toISOString();
            this.$mdDialog.hide(this.task);
        }

        /**
         * cancel
         */
        public cancel() {
            this.$mdDialog.cancel('cancel');
        }

        public showStatus = () => {
            var selected = this.$filter('filter')(this.statuses, { value: this.task.status });
            if (selected.length > 0)
                return selected[0].text;
            else return 'Not set';
        };

        public showType = () => {
            var selected = this.$filter('filter')(this.types, { value: this.task.type });
            if (selected.length > 0)
                return selected[0].text;
            else return 'Not set';
        };

        public loadUsers = () => {
            if (!this.users) {
                this.usersService.getUsers().then(response => {
                    this.users = response.data.users;
                });
            }
        }
    }

    angular
        .module('TaskMgrApp.controllers')
        .controller('EditTaskModalController', EditTaskModalController);
}