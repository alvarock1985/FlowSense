'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './infoWindow.routes';

export class InfoWindowComponent {

  /*@ngInject*/
  constructor() {
    
  }

  $onInit(){
    console.log(this.stationId);
    console.log("hola");
  }


}

export default angular.module('flowSenseApp.infoWindow', [uiRouter])
  .config(routes)
  .component('infoWindow', {
    template: require('./infoWindow.html'),
    controller: InfoWindowComponent,
    controllerAs: 'infoWindowCtrl'
  })
  .name;
