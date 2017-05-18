'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './alarm.routes';

export class AlarmComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('flowSenseApp.alarm', [uiRouter])
  .config(routes)
  .component('alarm', {
    template: require('./alarm.html'),
    controller: AlarmComponent,
    controllerAs: 'alarmCtrl'
  })
  .name;
