/**
 * Created by Przemek on 26.05.2016.
 */
define(['../app'], function (app) {
    'use strict';
    app.provider('usersServices', function () {
        this.createUser = function ($http, user) {          
            return $http.post('http://localhost:5000/user/create', user);
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
