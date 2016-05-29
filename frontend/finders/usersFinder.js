/**
 * Created by Przemek on 26.05.2016.
 */
define(['../app'], function (app) {
    'use strict';
    app.provider('usersFinder', function () {
        var baseUrl = "http://localhost:5000";
        this.getAllUsers = function ($http) {
            return $http({
                method: 'GET',
                url: baseUrl + "/users"
            });
        };
        this.$get = function ($http) {
            var $this = this;
            return {
                getAllUsers: function () {
                    return $this.getAllUsers($http);
                }
            };
        };
    })
});
