'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './client.routes';

export class ClientComponent {
  clients = [];


  /*@ngInject*/
  constructor($http, $scope, socket, Notification) {
    this.Notification = Notification;
    this.socket = socket;
    this.$scope = $scope;
    this.$http = $http;
    this.stationId = null;
    this.sensorId = null;
    this.monInterval = null;
    this.rangeMin = null;
    this.rangeMax = null;
    this.isActive = null;
    this.edit = false;

    this.success = function(client){
      this.Notification.success('Datos enviados para sensor: '+client.sensorId);
    }
    this.delete = function(client){
      this.Notification.error('Cliente eliminado');
    }
    this.error = function(){
      this.Notification.error('Error al enviar datos');
    }
    this.primary = function(){
      this.Notification('Primaty notfication');
    };

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('client');
    });

  }

  $onInit(){
    this.$http.get('/api/clients')
    .then(response => {
      this.clients = response.data;

    })

    this.$http.get('http://mon.acmeapps.xyz:8080/EmuSensor/webapi/stations')
    .then(response => {
      this.stations = response.data;
      this.socket.syncUpdates('client', this.clients);
      for(var i in this.clients){
        this.checkActive = this.clients[i].isActive;
        this.clients[i].edit = false;
          for(var m in this.stations){
            if(this.clients[i].stationId===this.stations[m].id){
              this.clients[i].name = this.stations[m].description;

            }
          }
      }
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
      this.success(data);
    })

    this.reloadName();

  }

  reloadName(){
    this.$http.get('http://mon.acmeapps.xyz:8080/EmuSensor/webapi/stations')
    .then(response => {
      this.stations = response.data;
      this.socket.syncUpdates('client', this.clients);
      for(var i in this.clients){
        this.checkActive = this.clients[i].isActive;
        this.clients[i].edit = false;
          for(var m in this.stations){
            if(this.clients[i].stationId===this.stations[m].id){
              this.clients[i].name = this.stations[m].description;
            }
          }
      }
    })
  }

  getSensors(stationId){
    this.$http.get('http://mon.acmeapps.xyz:8080/EmuSensor/webapi/sensors/'+stationId)
    .then(response => {
      this.sensors = response.data;
    })
  }

  editData(client){
    client.edit = true;
  }

  disableEdit(client){
    client.edit=false;
  }

  updateClient(client){
    var toPatch = JSON.stringify(client);
    this.$http.put(`/api/clients/${client._id}`, client)
    .then(response =>{
      if(response.status===200){
        this.success(client);
      }else{
        this.error();
      }
    })

  }

  deleteClient(client){
    this.$http.delete(`/api/clients/${client._id}`);
    this.delete(client);
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
