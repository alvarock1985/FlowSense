'use strict';
const angular = require('angular');

/*@ngInject*/
export function dataArrayService() {
	// AngularJS will instantiate a singleton by calling "new" on this function
  

}

export default angular.module('flowSenseApp.dataArray', [$http])
  .service('dataArray', dataArrayService)
  .name;
