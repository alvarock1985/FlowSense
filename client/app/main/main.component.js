import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  $http;
  socket;
  awesomeThings = [];
  numeros = [];
  newThing = '';

  /*@ngInject*/
  constructor($http, $scope, socket ) {
    this.$http = $http;
    this.socket = socket;
    this.cosas = [1,2,3,4];
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');

    });
  }


  $onInit() {

  }

  addThing() {
    if(this.newThing) {
      this.$http.post('/api/things', {
        name: this.newThing
      });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete(`/api/things/${thing._id}`);
  }
}

export default angular.module('flowSenseApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController,
    controllerAs: 'mainCtrl'

  })
  .name;
