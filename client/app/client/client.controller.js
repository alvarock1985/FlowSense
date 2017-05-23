'use strict';
const angular = require('angular');

/*@ngInject*/
export function clientController($scope, Notification) {
  $scope.primary = function() {
    Notification('Primary notification');
  };
}

export default angular.module('flowSenseApp.client', [])
  .controller('ClientController', clientController)
  .name;
