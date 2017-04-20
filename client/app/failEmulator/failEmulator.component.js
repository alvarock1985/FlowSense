'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './failEmulator.routes';

export class FailEmulatorComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('flowSenseApp.failEmulator', [uiRouter])
  .config(routes)
  .component('failEmulator', {
    template: require('./failEmulator.html'),
    controller: FailEmulatorComponent,
    controllerAs: 'failEmulatorCtrl'
  })
  .name;
