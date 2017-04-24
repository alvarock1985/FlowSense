'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './parametros.routes';

export class ParametrosComponent {
  $http;
  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  setParams(){
    var data = {
      hola: 'hola'
    }
    var toPost = JSON.stringify(data);
    console.log(toPost);
    this.$http.post('/api/params', toPost)
    .then(response => {
      console.log(response.status);
    })
  }
}

export default angular.module('flowSenseApp.parametros', [uiRouter])
  .config(routes)
  .component('parametros', {
    template: require('./parametros.html'),
    controller: ParametrosComponent,
    controllerAs: 'parametrosCtrl'
  })
  .name;
