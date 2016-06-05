/// <reference path="..\..\..\node_modules\definitely-typed-angular\angular.d.ts" />
/// <reference path="..\..\..\node_modules\definitely-typed-angular-ui-bootstrap\angular-ui-bootstrap.d.ts" />
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
        static $inject = ['$uibModalInstance', 'task'];
        constructor(private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance, public task: TaskMgrApp.Models.Task) {
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
    }

    angular
        .module('TaskMgrApp.controllers')
        .controller('EditTaskModalController', EditTaskModalController);
}