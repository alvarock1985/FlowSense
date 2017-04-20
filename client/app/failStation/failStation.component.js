'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './failStation.routes';

export class FailStationComponent {
  $http;
  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
    this.stationId = null;
    this.statusList = ['OK', 'WARN', 'FAIL'];
    this.status = "";
    this.sendStatus = "";

  }

  $onInit(){
    this.$http.get('http://mon.acmeapps.xyz:8080/EmuSensor/webapi/stations')
    .then(response => {
      this.stations = response.data;
    })
  }

  postData(){
    var data = {
      id: this.stationId,
      status: this.status
    }
    var toPost = JSON.stringify(data);
    console.log(toPost);
    this.$http.post('http://mon.acmeapps.xyz:8080/EmuSensor/webapi/stations/updateStatus', toPost)
    .then(response => {
      console.log(response.status);
    });
  }
}

export default angular.module('flowSenseApp.failStation', [uiRouter])
  .config(routes)
  .component('failStation', {
    template: require('./failStation.html'),
    controller: FailStationComponent,
    controllerAs: 'failStationCtrl'
  })
  .name;
