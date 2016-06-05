/**
 * Created by Przemek on 26.05.2016.
 */
define(['../app'], function (app) {
    'use strict';
    app.provider('chartFinder', function () {
        var baseUrl = "http://localhost:5000";
        this.getAllTasks = function ($http) {
            return $http({
                method: 'GET',
                url: baseUrl + "/tasks"
            });
        };
        this.$get = function ($http) {
            var $this = this;
            return {
                getAllTasks: function () {
                    return $this.getAllTasks($http);
                }
            };
        };
    })
});
