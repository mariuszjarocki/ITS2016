/**
 * Created by Przemek on 28.05.2016.
 */
define(['../app', 'lodash', 'moment', 'angular-bootstrap'], function (app, _, moment) {
    app = angular.module('app', ["ui.bootstrap"]);


    angular.module('app').controller('userModalCtrl', function ($scope, $uibModalInstance, items, firstName) {

        $scope.items = items;
        $scope.firstName = firstName;
        $scope.selected = {
            item: $scope.items[0],
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            email: $scope.email,
            password: $scope.password
        };
        $scope.save = function () {
            console.log("SAVE")
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.selected);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };


    });
});
