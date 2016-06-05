/**
 * Created by Przemek on 26.05.2016.
 */
define(['../app', 'lodash', 'moment', '../finders/chartFinder', 'timeline-angular'], function (app, _, moment) {
    app = angular.module('app', []);
    app.controller('chartCtrl', function ($scope, $element, $http, $compile, $timeout, chartFinder) {

        var TaskTypeEnum = {
            '0': 'STANDARD REQUEST',
            '1': 'INCIDEND',
            '2': 'FOR TESTING'
        };

        var TaskStatusEnum = {
            0: 'UNRESOLVED',
            1: 'OPEN',
            2: 'IN PROGRESS',
            3: 'CLOSED'
        };

        $scope.options = {
            debug: false,
            timenav_position: 'bottom',
            language: 'en'
        };
        var tasks = [];
        var button;
        chartFinder.getAllTasks().success(function (data) {
            _.forEachRight(data.tasks, function (value) {
                var dateStart = new Date(value.startDate);
                var dateEnd = new Date(value.endDate);
                var task = {
                    'start_date': {
                        'year': dateStart.getYear() + 1900,
                        'month': dateStart.getMonth() + 1,
                        'day': dateStart.getDate()
                    },
                    'end_date': {
                        'year': dateEnd.getYear() + 1900,
                        'month': dateEnd.getMonth() + 1,
                        'day': dateEnd.getDate()
                    },
                    'text': {
                        'headline': '<div class="row text-center">' + value.title + '</div>',
                        'text': '<div class="col-md-2"><strong>Creator:</strong></div><div class="col-md-10">' + value._creator.name.first + ' ' + value._creator.name.last + '</div>' +
                        //FIXME po poprawie backendu odkomentowac
                        /*'<div class="col-md-2"><strong>Project:</strong></div><div class="col-md-10">' + value._project + '</div>' +*/
                        '<div class="col-md-2"><strong>Contractor:</strong></div><div class="col-md-10">' + value._contractor.name.first + ' ' + value._contractor.name.last + '</div>' +
                        '<div class="row"></div>' +
                        '<div class="col-md-2"><strong>Type task:</strong></div><div class="col-md-10">' + TaskTypeEnum[value.type] + '</div>' +
                        '<div class="col-md-2"><strong>Status task:</strong></div><div class="col-md-10">' + TaskStatusEnum[value.status] + '</div>' +
                        '<div class="col-md-2"><strong>Creation date:</strong></div><div class="col-md-10">' + value.creationDate + '</div>' +
                        '<div class="col-md-2"><strong>Start date:</strong></div><div class="col-md-10">' + value.startDate + '</div>' +
                        '<div class="col-md-2"><strong>Description:</strong></div><div class="col-md-10">' + value.description + '</div>'
                    }
                    , 'unique_id': value._id
                };
                tasks.push(task);
            });

        });

        $timeout(function () {
            var data = {
                'title': {
                    'media': {
                        'url': '',
                        'caption': '',
                        'credit': ''
                    },
                    'text': {
                        'headline': 'Task Manager Project',
                        'text': '<p>Task manager</p>'
                    }
                },
                'events': tasks
            };

            $scope.timeline.setData(data);
            $scope.timeline.goTo(1);
        }, 1000);

        $scope.$watch('options', function (newOptions) {
            if ($scope.timeline) {
                $scope.timeline.setOptions(newOptions);
            }
        }, true);

    });
});
