'use strict';

angular.module('TaskMgrApp.version', [
  'TaskMgrApp.version.interpolate-filter',
  'TaskMgrApp.version.version-directive'
])

.value('version', '0.0.1');
