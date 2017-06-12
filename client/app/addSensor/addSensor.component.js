'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './addSensor.routes';

export class AddSensorComponent {
  $http;
  $scope;
  /*@ngInject*/
  constructor($http, Notification) {
    this.Notification = Notification;
    this.$http = $http;
    this.names= ["caudal", "temp", "precip", "hum", "nieve"];
    this.name = null;
    this.types = ["fluviometrico", "meteorologico"];
    this.type = null;
    this.stationId = null;
    this.status = "";

    this.success = function(){
      this.Notification.success('Datos enviados correctamente');
    }
    this.delete = function(){
      this.Notification.error('Monitor eliminado');
    }
    this.error = function(){
      this.Notification.error('Error al enviar datos');
    }
    this.primary = function(){
      this.Notification('Primaty notfication');
    };


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
      if(response.status===200){
        this.success();
      }else{
        this.success();
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
