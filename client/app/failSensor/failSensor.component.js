'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './failSensor.routes';

export class FailSensorComponent {
  $http;
  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
    this.stationId = null;
    this.sensorId = null;
    this.statusList = ['OK', 'FAIL'];
    this.status = "";
    this.sendStatus = "";
    this.numFail = null;

  }

  $onInit(){
    this.$http.get('http://mon.acmeapps.xyz:8080/EmuSensor/webapi/stations')
    .then(response => {
      this.stations = response.data;
    })
  }

  getSensors(stationId){
    this.$http.get('http://mon.acmeapps.xyz:8080/EmuSensor/webapi/sensors/'+stationId)
    .then(response => {
      this.sensors = response.data;
      console.log(this.sensors);
    })
  }
  postData(){
    var data = {
      id: this.stationId,
      status: this.status
    }
    var toPost = JSON.stringify(data);
    console.log(toPost);
    this.$http.post('http://mon.acmeapps.xyz:8080/EmuSensor/webapi/sensors/updateStatus', toPost)
    .then(response => {
      console.log(response.status);
    });
  }

}

export default angular.module('flowSenseApp.failSensor', [uiRouter])
  .config(routes)
  .component('failSensor', {
    template: require('./failSensor.html'),
    controller: FailSensorComponent,
    controllerAs: 'failSensorCtrl'
  })
  .name;
