'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './monitor.routes';

export class MonitorComponent {
  $http;
  socket;
  newMonitors = [];
  /*@ngInject*/
  constructor($http, socket) {
    this.$http = $http;
    this.socket = socket;
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
  }

  $onInit(){
    this.$http.get('/api/monoptions')
    .then(response =>{
        this.configuration = response.data[0];
        this.configInterval = response.data[0].interval;
        this.configId = response.data[0]._id;
        this.stationId = null;
        this.socket.syncUpdates('monoptions', this.configuration);
    })

    this.$http.get('/api/monitors')
    .then(response => {

      this.monitors = response.data;
      for(var i in this.monitors){
        if(this.monitors[i].isGlobal==='true'){
          this.globalMonitor = this.monitors[i];
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
      for(var i in this.stations){
        for(var m in this.newMonitors){
          if(this.stations[i].id===this.newMonitors[m].stationId){
            this.newMonitors[m].name = this.stations[i].description;
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

    if(data.isGlobal){
      for(var i in this.monitors){
        if(this.monitors[i].isGlobal){
          var toPut = JSON.stringify(data);
          this.$http.put('/api/monitors/'+this.monitors[i]._id, toPut)
          .then(response => {
            console.log(response.status);
          })
        }
      }

    }else{
      var toPost = JSON.stringify(data);
      this.$http.post('/api/monitors', toPost)
      .then(response => {
        console.log(response.status);
      })
    }

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
