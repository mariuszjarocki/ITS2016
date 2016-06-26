/// <reference path="..\..\..\node_modules\definitely-typed-angular\angular.d.ts" />
/// <reference path="..\..\..\node_modules\definitely-typed-angular-ui-bootstrap\angular-ui-bootstrap.d.ts" />
/// <reference path="../models/uimodels.ts" />
/// <reference path="..\Models\Task.ts" />

namespace TaskMgrApp.Controllers {
    'use strict';

    export class EditTaskModalController {
        public startDatePopup = {
            opened: false,
            selectedDate: new Date()
        };

        public endDatePopup = {
            opened: false,
            selectedDate: new Date()
        };

        public statuses = TaskMgrApp.Models.TaskStatusesItems;
        public types = TaskMgrApp.Models.TaskTypesItems;

        static $inject = ['$uibModalInstance', '$filter', 'task'];
        constructor(private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance, private $filter: ng.IFilterService, public task: TaskMgrApp.Models.Task) {
            this.startDatePopup.selectedDate = new Date(this.task.startDate);
            this.endDatePopup.selectedDate = new Date(this.task.endDate);
        }

        /**
         * save
         */
        public save() {
            this.task.startDate = this.startDatePopup.selectedDate.toISOString();
            this.task.endDate = this.endDatePopup.selectedDate.toISOString();
            this.$uibModalInstance.close(this.task);
        }

        /**
         * cancel
         */
        public cancel() {
            this.$uibModalInstance.dismiss('cancel');
        }

        public openStartDatePopup = () => {
            this.startDatePopup.opened = true;
        }
        public openEndDatePopup = () => {
            this.endDatePopup.opened = true;
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
    }

    angular
        .module('TaskMgrApp.controllers')
        .controller('EditTaskModalController', EditTaskModalController);
}