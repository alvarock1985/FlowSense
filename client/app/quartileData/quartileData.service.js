'use strict';
const angular = require('angular');

/*@ngInject*/
export function quartileDataService() {
	// AngularJS will instantiate a singleton by calling "new" on this function
}

export default angular.module('flowSenseApp.quartileData', [])
  .service('quartileData', quartileDataService)
  .name;
