'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './cosas.routes';

export class CosasComponent {
  $http;
  socket;
  cosas = [];
  $scope;
  cosa = '';
  /*@ngInject*/
  constructor($http, socket, $scope) {
    this.$http = $http;
    this.socket = socket;

  }


  $onInit(){
    this.$http.get('/api/cosass')
    .then(response =>{
        this.cosas = response.data;
        this.socket.syncUpdates('cosas', this.cosas);
    })
  }

  addCosas(){
    if(this.cosa){
      this.$http.post('/api/cosass', {
        cosas : this.cosa
      });
      this.cosa = '';
    }
  }

  purgeCosas(){

  }
}

export default angular.module('flowSenseApp.cosas', [uiRouter])
  .config(routes)
  .component('cosas', {
    template: require('./cosas.html'),
    controller: CosasComponent,
    controllerAs: 'cosasCtrl'
  })
  .name;
