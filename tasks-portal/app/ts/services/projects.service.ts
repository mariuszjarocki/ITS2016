/// <reference path="..\..\..\node_modules\definitely-typed-angular\angular.d.ts" />
/// <reference path="ApiConfig.ts" />

import Project = TaskMgrApp.Models.Project;

module TaskMgrApp.Services {
    export interface IProjectsService {
        getProjects: () => ng.IHttpPromise<GetProjectsResponse>;
    }
    export interface GetProjectsResponse {
        projects: Project[];
    }
    /**
     * TasksService
     */
    export class ProjectsService implements IProjectsService {
        static $inject = ['$http'];
        constructor(private $http: ng.IHttpService) {

        }

        getProjects = () => {
            var result = this.$http.get<GetProjectsResponse>(Config.ProjectsGetUrl, { headers: {} });
            return result;
        }

    }

    angular.module('TaskMgrApp.services').service('projectsService', ProjectsService);
}