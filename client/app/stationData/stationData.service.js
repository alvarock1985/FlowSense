'use strict';
const angular = require('angular');

/*@ngInject*/
export function stationDataService() {
	// AngularJS will instantiate a singleton by calling "new" on this function
  /*@ngInject*/



}

export default angular.module('flowSenseApp.stationData', [])
  .service('stationData', stationDataService)
  .name;
