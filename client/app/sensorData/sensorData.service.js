'use strict';
const angular = require('angular');

/*@ngInject*/
export function sensorDataService() {
	// AngularJS will instantiate a singleton by calling "new" on this function
}

export default angular.module('flowSenseApp.sensorData', [])
  .service('sensorData', sensorDataService)
  .name;
