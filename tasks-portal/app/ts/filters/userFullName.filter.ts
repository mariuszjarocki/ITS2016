/// <reference path="../models/user.ts" />


module TaskMgrApp.Filters {
    export function userFullNameFilter() {
        return function (users: Models.User[], fullNameQuery: string) {
            if (!fullNameQuery)
                return users;
            if (!users)
                return users;

            var result: Models.User[] = [];
            for (var user of users) {
                var query = fullNameQuery.toLowerCase();
                var fullname = user.name.last.toLowerCase() + ' ' + user.name.first.toLowerCase();

                if (fullname.indexOf(query) != -1) {
                    result.push(user);
                }
            }

            return result;
        }
    }
}
angular.module('TaskMgrApp.filters').filter('userFullNameFilter', TaskMgrApp.Filters.userFullNameFilter);