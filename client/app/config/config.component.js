'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './config.routes';

export class ConfigComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('flowSenseApp.config', [uiRouter])
  .config(routes)
  .component('config', {
    template: require('./config.html'),
    controller: ConfigComponent,
    controllerAs: 'configCtrl'
  })
  .name;
