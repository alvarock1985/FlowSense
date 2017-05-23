'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './monitor.routes';

export class MonitorComponent {
  $http;
  socket;
  $scope;
  monitors = [];
  newMonitors = [];
  /*@ngInject*/
  constructor($http, socket, $scope, Notification) {
    this.$http = $http;
    this.socket = socket;
    this.$scope = $scope;
    this.Notification = Notification;
    this.inverval="";
    this.emailId = '';
    this.configInterval = "";
    this.configuration = null;
    this.selectInterval = [5, 10, 30, 60];
    this.selectType = true;
    this.holdTimeData = null;
    this.holdTimeRange = null;
    this.rangeMax = null;
    this.rangeMin = null;
    this.edit = false;

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
    this.$http.get('/api/monoptions')
    .then(response =>{
        this.configuration = response.data[0];
        this.configInterval = response.data[0].interval;
        this.configId = response.data[0]._id;
        this.stationId = null;

    })

    this.$http.get('/api/monitors')
    .then(response => {

      this.monitors = response.data;
      //this.socket.syncUpdates('monitor', this.monitors);
      for(var i in this.monitors){
        if(this.monitors[i].isGlobal==='true'){
          this.globalMonitor = this.monitors[i];
          this.globalMonitor.edit = false;
        }else{
          if(this.monitors[i].stationId!=='null'){
            this.newMonitors.push(this.monitors[i]);
            console.log(this.newMonitors);
          }

        }
      };



    })

    this.$http.get('http://mon.acmeapps.xyz:8080/EmuSensor/webapi/stations')
    .then(response => {
      this.stations = response.data;
      this.socket.syncUpdates('monitor', this.monitors);
      for(var i in this.stations){
        for(var m in this.newMonitors){
          if(this.stations[i].id===this.newMonitors[m].stationId){
            this.newMonitors[m].name = this.stations[i].description;
            this.newMonitors[m].edit = false;
          }
        }
      }

    })
  }

  reloadConfig(){
    this.monitors = [];
    this.newMonitors = [];
    this.$http.get('/api/monitors')
    .then(response => {

      this.monitors = response.data;
      this.socket.syncUpdates('monitor', this.monitors);
      for(var i in this.monitors){
        if(this.monitors[i].isGlobal==='true'){
          this.globalMonitor = this.monitors[i];
          this.globalMonitor.edit = false;
        }else{
          if(this.monitors[i].stationId!=='null'){
            this.newMonitors.push(this.monitors[i]);
            console.log(this.newMonitors);
          }
        }
      };
    });

    this.$http.get('http://mon.acmeapps.xyz:8080/EmuSensor/webapi/stations')
    .then(response => {
      this.stations = response.data;
      this.socket.syncUpdates('monitor', this.monitors);
      for(var i in this.stations){
        for(var m in this.newMonitors){
          if(this.stations[i].id===this.newMonitors[m].stationId){
            this.newMonitors[m].name = this.stations[i].description;
            this.newMonitors[m].edit = false;
          }
        }
      }

    })
  }

  sendConfig(){
    var data = {
      interval : this.interval,
      emailId : this.emailId
    }
    var toPost = JSON.stringify(data)
    this.$http.put('/api/monoptions/'+this.configId, toPost)
    .then(response => {
      console.log(response.data);

    });
  }

  sendConfigV2(){
    var data = {
      stationId: this.stationId,
      isGlobal: this.selectType,
      email: this.emailId,
      sendTime: this.interval,
      holdTimeData: this.holdTimeData,
      holdTimeRange: this.holdTimeRange,
      rangeMax: this.rangeMax,
      rangeMin: this.rangeMin
    }
    console.log(data);
    if(data.isGlobal){
      for(var i in this.monitors){
        if(this.monitors[i].isGlobal){
          var toPut = JSON.stringify(data);
          this.$http.put('/api/monitors/'+this.monitors[i]._id, toPut)
          .then(response => {
            console.log(response.status);
            if(response.status===200){
              this.success();
            }else{
              this.error();
            }
          })
        }
      }

    }else{
      var toPost = JSON.stringify(data);
      this.$http.post('/api/monitors', toPost)
      .then(response => {
        console.log(response.status);
        if(response.status===200){
          this.success();
        }else{
          this.success();
        }
      })
    }
    this.reloadConfig();


  }



  editData(monitor){

    monitor.edit = true;

  }

  disableEdit(monitor){

    monitor.edit = false;
  }

  deleteMonitor(monitor){
    this.$http.delete(`/api/monitors/${monitor._id}`);
    this.reloadConfig();
    this.delete();
  }

  updateMonitor(monitor){

    this.$http.put(`/api/monitors/${monitor._id}`, monitor)
    .then(res => {
      console.log(res.status);
      if(res.status===200){
        this.success();
      }else{
        this.error();
      }
    })

    this.reloadConfig();

  }


}

export default angular.module('flowSenseApp.monitor', [uiRouter])
  .config(routes)
  .component('monitor', {
    template: require('./monitor.html'),
    controller: MonitorComponent,
    controllerAs: 'monitorCtrl'
  })
  .name;
