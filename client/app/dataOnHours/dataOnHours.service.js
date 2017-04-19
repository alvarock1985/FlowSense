'use strict';
const angular = require('angular');

/*@ngInject*/
export function dataOnHoursService() {
	// AngularJS will instantiate a singleton by calling "new" on this function
}

export default angular.module('flowSenseApp.dataOnHours', [])
  .service('dataOnHours', dataOnHoursService)
  .name;
