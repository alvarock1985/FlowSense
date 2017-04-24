'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './monitor.routes';

export class MonitorComponent {
  $http;
  socket;
  /*@ngInject*/
  constructor($http, socket) {
    this.$http = $http;
    this.socket = socket;
    this.inverval="";
    this.configInterval = "";
    this.selectInterval = [5, 10, 30, 60];
  }

  $onInit(){
    this.$http.get('/api/monoptions')
    .then(response =>{
        this.configInterval = response.data;
        this.socket.syncUpdates('monoptions', this.configInterval);
    })
  }

  sendConfig(){
    var data = {
      interval : this.interval
    }
    var toPost = JSON.stringify(data)
    this.$http.put('/api/monoptions/58fd301fd650ab36e5aee2d1', toPost)
    .then(response => {
      console.log(response.data);
      
    });
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
