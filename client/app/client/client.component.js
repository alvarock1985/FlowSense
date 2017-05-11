'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './client.routes';

export class ClientComponent {
  clients = [];

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.socket = socket;
    this.$scope = $scope;
    this.$http = $http;
    this.stationId = null;
    this.sensorId = null;
    this.monInterval = null;
    this.rangeMin = null;
    this.rangeMax = null;
    this.isActive = null;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('client');
});

  }

  $onInit(){
    this.$http.get('/api/clients')
    .then(response => {
      this.clients = response.data;
      console.log(this.clients);
    })

    this.$http.get('http://mon.acmeapps.xyz:8080/EmuSensor/webapi/stations')
    .then(response => {
      this.stations = response.data;
      this.socket.syncUpdates('client', this.clients);
    })
  }

  postClient(){
    console.log("Sending Data");
    var data = {
      stationId: this.stationId,
      sensorId: this.sensorId,
      monInterval: this.monInterval,
      rangeMin: this.rangeMin,
      rangeMax: this.rangeMax,
      isActive: this.isActive
    }
    var toPost = JSON.stringify(data);
    this.$http.post('/api/clients', toPost)
    .then(response => {
      console.log(response.status);
    })
  }

  getSensors(stationId){
    this.$http.get('http://mon.acmeapps.xyz:8080/EmuSensor/webapi/sensors/'+stationId)
    .then(response => {
      this.sensors = response.data;
    })
  }

  deleteClient(client){
    this.$http.delete(`/api/clients/${client._id}`);
  }
}

export default angular.module('flowSenseApp.client', [uiRouter])
  .config(routes)
  .component('client', {
    template: require('./client.html'),
    controller: ClientComponent,
    controllerAs: 'clientCtrl'
  })
  .name;
