import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  $http;
  socket;
  awesomeThings = [];
  numeros = [];
  newThing = '';
  isAdmin: Function;
  isLoggedIn: Function;
  getCurrentUser: Function;
  /*@ngInject*/
  constructor($http, $scope, socket,Notification, Auth ) {
    'ngInject';
    this.Notification = Notification;
    this.$http = $http;
    this.socket = socket;
    this.cosas = [1,2,3,4];
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');

    });
    this.success = function(){
      this.Notification.success('Datos enviados correctamente');
    }
    this.delete = function(){
      this.Notification.error({message: 'Error notification (no timeout)', delay: null});
    }
    this.error = function(){
      this.Notification.error('Error al enviar datos');
    }
    this.primary = function(){
      this.Notification('Primaty notfication');
    };
    this.isAdmin = Auth.isAdminSync;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }


  $onInit() {
    console.log(this.getCurrentUser());
    console.log(this.isAdmin());
    console.log(this.isLoggedIn());
    this.$http.get('http://mon.acmeapps.xyz:8080/EmuSensor/webapi/stations')
    .then(res => {
      var isNormal = true;
      var data = res.data;
      if(this.isAdmin()){
        for(var i in data){
          if(data[i].status==='FAIL'){
            var desc = data[i].description;
            isNormal = false;
            //console.log(data[i].description);
            //console.log(data[i].status);
            this.Notification.error({message: 'Falla en estacion: '+desc, delay: null})
          }else if (data[i]==='WARN') {
            var desc = data[i].description;
            isNormal = false;
            this.Notification.warning({message: 'Alarma en estacion: '+desc, delay: null})
          }
          //console.log(data[i].description);
        }
        if(isNormal){
          this.Notification.success('No se registran alarmas en estaciones');
        }
      }

    })
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
