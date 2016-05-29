/**
 * Created by Przemek on 26.05.2016.
 */
define(['../app'], function (app) {
    'use strict';
    app.provider('usersServices', function () {
        var baseUrl = "http://localhost:5000";
        this.createUser = function ($http, user) {
            console.log(user);
            var data = user || {};
            return $http({
                method: 'POST`',
                url: baseUrl+ "/user/create",
                data: data
            });
        };
        this.$get = function ($http) {
            var $this = this;
            return {
                createUser: function (user) {
                    return $this.createUser($http, user);
                }
            };
        };
    })
});
