/// <reference path="..\..\..\node_modules\definitely-typed-angular\angular.d.ts" />
/// <reference path="ApiConfig.ts" />

/// <reference path="..\Models\Task.ts" />

import Task = TaskMgrApp.Models.Task;

module TaskMgrApp.Services{
    export interface ITasksService{
        getTasks: () => ng.IHttpPromise<GetTasksResponse>;
        updateTask: (taskToUpdate: Task) => ng.IHttpPromise<any>;
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
            var result = this.$http.get<GetTasksResponse>(Config.TasksGetUrl, { headers: {}});
            return result;
        }
        
        updateTask = (taskToUpdate: Task) => {
            var result = this.$http.post(Config.TaskUpdateUrl + taskToUpdate._id, taskToUpdate);
            return result;
        }
    }
    
    angular.module('TaskMgrApp.services').service('TasksService', TasksService);
}