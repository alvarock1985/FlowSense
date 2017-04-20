'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './addSensor.routes';

export class AddSensorComponent {
  $http;
  $scope;
  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
    this.names= ["caudal", "temp", "precip", "hum", "nieve"];
    this.name = null;
    this.types = ["fluviometrico", "meteorologico"];
    this.type = null;
    this.stationId = null;
    this.status = "";


  }

  $onInit(){
    this.$http.get('http://mon.acmeapps.xyz:8080/EmuSensor/webapi/stations')
    .then(response => {
      this.stations = response.data;
    })
  }

  postData(){
    var data = {
      name: this.name,
      type: this.type,
      stationid: this.stationId
    }

    var toPost = JSON.stringify(data);
    this.$http.post('http://mon.acmeapps.xyz:8080/EmuSensor/webapi/sensors/add', toPost)
    .then(response => {
      console.log(response.status)
      if(response.status === 204){
        this.status ="datos enviados correctamente";
      }else{
        this.status = "error al enviar los datos";
      }
    })

  }
}

export default angular.module('flowSenseApp.addSensor', [uiRouter])
  .config(routes)
  .component('addSensor', {
    template: require('./addSensor.html'),
    controller: AddSensorComponent,
    controllerAs: 'addSensorCtrl'
  })
  .name;
