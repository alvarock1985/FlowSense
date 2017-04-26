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
    this.emailId = '';
    this.configInterval = "";
    this.configuration = null;
    this.selectInterval = [5, 10, 30, 60];
  }

  $onInit(){
    this.$http.get('/api/monoptions')
    .then(response =>{
        this.configuration = response.data[0];
        this.configInterval = response.data[0].interval;
        this.configId = response.data[0]._id;
        console.log(this.configId);
        this.socket.syncUpdates('monoptions', this.configuration);
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


}

export default angular.module('flowSenseApp.monitor', [uiRouter])
  .config(routes)
  .component('monitor', {
    template: require('./monitor.html'),
    controller: MonitorComponent,
    controllerAs: 'monitorCtrl'
  })
  .name;
