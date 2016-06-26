/// <reference path="..\..\..\node_modules\definitely-typed-angular\angular.d.ts" />
/// <reference path="ApiConfig.ts" />

import User = TaskMgrApp.Models.User;

module TaskMgrApp.Services {
    export interface IUsersService {
        getUsers: () => ng.IHttpPromise<GetUsersResponse>;
    }
    export interface GetUsersResponse {
        users: User[];
    }
    /**
     * TasksService
     */
    export class UsersService implements IUsersService {
        static $inject = ['$http'];
        constructor(private $http: ng.IHttpService) {

        }

        getUsers = () => {
            var result = this.$http.get<GetUsersResponse>(Config.UsersGetUrl, { headers: {} });
            return result;
        }

    }

    angular.module('TaskMgrApp.services').service('UsersService', UsersService);
}