/// <reference path="..\..\..\node_modules\definitely-typed-angular\angular.d.ts" />
/// <reference path="..\Models\Task.ts" />

import Task = TaskMgrApp.Models.Task;

module TaskMgrApp.Services{
    export interface ITasksService{
        getTasks: () => ng.IHttpPromise<GetTasksResponse>;
    }
    export interface GetTasksResponse{
        tasks: Task[];
    }
    /**
     * TasksService
     */
    export class TasksService implements ITasksService {
        static $inject = ['$http'];
        constructor(private $http: ng.IHttpService) {
            
        }
        
        getTasks = () => {
            var result = this.$http.get<GetTasksResponse>("http://localhost:5000/tasks", { headers: {}});
            return result;
        }
    }
    
    angular.module('TaskMgrApp.services').service('TasksService', TasksService);
}