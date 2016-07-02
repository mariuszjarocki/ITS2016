/// <reference path="..\..\..\node_modules\definitely-typed-angular\angular.d.ts" />
/// <reference path="../models/uimodels.ts" />
/// <reference path="..\Models\Task.ts" />

namespace TaskMgrApp.Controllers {
    'use strict';

    export class EditTaskModalController {

        public users: User[];
        public projects: Project[];
        public userSearchTerm: string;
        public projectSearchTerm: string;

        public startDatePopup = {
            selectedDate: new Date()
        };

        public endDatePopup = {
            selectedDate: new Date()
        };

        public statuses = TaskMgrApp.Models.TaskStatusesItems;
        public types = TaskMgrApp.Models.TaskTypesItems;

        static $inject = ['$scope', '$mdDialog', '$filter', 'task', 'UsersService', 'projectsService'];
        constructor(private $scope: ng.IScope, private $mdDialog: angular.material.IDialogService, private $filter: ng.IFilterService,
            public task: Models.Task, private usersService: Services.IUsersService, private projectsService: Services.IProjectsService) {
            this.startDatePopup.selectedDate = new Date(this.task.startDate);
            this.endDatePopup.selectedDate = new Date(this.task.endDate);
            this.userSearchTerm = '';
            this.projectSearchTerm = '';
            this.loadUsers();
            this.loadProjects();
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
                    if (this.task._contractor) {
                        // dirty workaround to get contractor selected on dropdown when loading users.
                        var selectedUser = this.$filter('filter')(this.users, { _id: this.task._contractor._id });
                        this.task._contractor = selectedUser[0];
                    }
                });
            }
        }

        public loadProjects = () => {
            if (!this.projects) {
                this.projectsService.getProjects().then(response => {
                    this.projects = response.data.projects;
                    if (this.task._project) {
                        var selectedproject = this.$filter('filter')(this.projects, { _id: this.task._project._id });
                        this.task._project = selectedproject[0];
                    }
                });
            }
        }

        public clearUserSearchTerm = () => {
            this.userSearchTerm = '';
        }

        public onSearchChange = (event) => {
            event.stopPropagation();
        }
    }

    angular
        .module('TaskMgrApp.controllers')
        .controller('EditTaskModalController', EditTaskModalController);
}