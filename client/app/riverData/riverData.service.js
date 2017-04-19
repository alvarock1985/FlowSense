'use strict';
const angular = require('angular');

/*@ngInject*/
export function riverDataService() {
	// AngularJS will instantiate a singleton by calling "new" on this function
}

export default angular.module('flowSenseApp.riverData', [])
  .service('riverData', riverDataService)
  .name;
