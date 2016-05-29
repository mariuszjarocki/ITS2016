/**
 * Created by Przemek on 26.05.2016.
 */
define(['../app', 'grid', 'lodash', 'moment', '../finders/usersFinder', '../services/usersServices', 'angular-bootstrap', './userModalController', 'angular-animate'], function (app, agGrid, _, moment) {
    agGrid.initialiseAgGridWithAngular1(angular);
    app = angular.module('app', ["agGrid", "ui.bootstrap"]);
    app.controller('usersCtrl', function ($scope, usersFinder, usersServices, $uibModal, $timeout, $http) {

        $scope.getUsers = function () {
            usersFinder.getAllUsers().success(function (data) {
                _.forEachRight(data.users, function (value) {
                    $scope.gridOptions.rowData.push(value);
                });
                $scope.gridOptions.api.setRowData($scope.gridOptions.rowData);
            });
        };

        $scope.rowData = [];
        $scope.columnDefs = [
            {headerName: "ID", field: "_id"},
            {headerName: "First name", field: "name.first"},
            {headerName: "Last name", field: "name.last"},
            {headerName: "Email", field: "email"},
            {headerName: "Role", field: "role"}
        ];
        $scope.gridOptions = {
            columnDefs: $scope.columnDefs,
            rowData: $scope.rowData
        };

        $scope.getUsers();


        $scope.refresh = function () {
            $scope.gridOptions.rowData = [];
            $scope.getUsers();
        };
        $scope.items = ['Admin', 'User'];

        $scope.animationsEnabled = true;

        $scope.open = function (size) {
            var modalInstance = $uibModal.open({
                templateUrl: 'frontend/users/userModal.html',
                controller: 'userModalCtrl',
                windowTemplateUrl: 'node_modules/angular-ui-bootstrap/template/modal/window.html',
                backdrop: false,
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    },
                    firstName: function () {
                        return $scope.firstName
                    }
                }
            });

            modalInstance.result.then(function (selectedItem, firstName) {
                $scope.selected = selectedItem;
                $scope.selected.role = 0;
                var user = {
                    name: {
                        first: $scope.selected.firstName,
                        last: $scope.selected.lastName
                    },
                    email: $scope.selected.email,
                    password: $scope.selected.password,
                    role: $scope.selected.role == "Admin" ? 0 : 1
                };
                console.log(user);
                $http.post('http://localhost:5000/user/create', user).success(function (data, status) {
                    console.log(data);
                    console.log(status);
                });
            }, function () {
            });
        };
        $scope.status = {
            isopen: false
        };

        $scope.toggled = function (open) {
            $log.log('Dropdown is now: ', open);
        };

        $scope.toggleDropdown = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status.isopen = !$scope.status.isopen;
        };

        $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
    });

});
