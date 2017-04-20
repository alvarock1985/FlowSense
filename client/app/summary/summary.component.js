'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './summary.routes';

export class SummaryComponent {
  $http;
  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
    this.stationId =  null;
  }

  $onInit(){
    this.$http.get('http://mon.acmeapps.xyz:8080/EmuSensor/webapi/stations')
    .then(response => {
      this.stations = response.data;
      for(var i in this.stations){
          this.stations[i].checkStatus = false;
            }
        })
    }
  getSensors(stationId){
    this.$http.get('http://mon.acmeapps.xyz:8080/EmuSensor/webapi/sensors/'+stationId)
    .then(response => {
      this.sensors = response.data;
      console.log(this.sensors);
    })
  }
}

export default angular.module('flowSenseApp.summary', [uiRouter])
  .config(routes)
  .component('summary', {
    template: require('./summary.html'),
    controller: SummaryComponent,
    controllerAs: 'summaryCtrl'
  })
  .name;
