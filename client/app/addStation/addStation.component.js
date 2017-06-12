'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './addStation.routes';

export class AddStationComponent {
  /*@ngInject*/
  $scope;
  $http;
  constructor($http, $scope, Notification) {
    this.Notification = Notification;
    this.$http = $http;
    this.data = {};
    this.riverId = 4;
    this.name;
    this.description;
    this.longitude  = $scope.lon;
    this.latitude =  $scope.lat;
    this.type ;
    this.watershed = 4;
    this.status = "";
    $scope.markers = [];
    this.map = {

            center: {latitude: -27.3771861, longitude:-70.3560286 },
            zoom: 7,
            control: {},
            window: {
                model: {},
                show: false,
                options: {
                    pixelOffset: {width: -1, height: -20},
                    maxWidth: 500
                }

            },

            markers: $scope.markers,
            events: {
                click: function (map, eventName, originalEventArgs) {
                    var e = originalEventArgs[0];
                    var lat = e.latLng.lat(),lon = e.latLng.lng();
                    var marker = {
                        id: Date.now(),
                        coords: {
                            latitude: lat,
                            longitude: lon
                        }
                    };

                    $scope.lat = e.latLng.lat();
                    $scope.lon = e.latLng.lng();
                    $scope.markers[0] = marker;
                    $scope.$apply();
                }
            },

            markersEvents:{
                click: function(marker, eventName, model, args){
                    this.map.window.model = model;
                    this.map.window.show = true;
                }
            }
        };

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
    this.$http.get('http://mon.acmeapps.xyz:8080/EmuSensor/webapi/rivers')
    .then(response =>{
      this.rivers = response.data;
    })
  }
  postData(lat, lon){
    console.log("posting data");
    var data = {
          name : this.name,
          description: this.description,
          longitude: lon,
          latitude: lat,
          type : this.type,
          watershedId: this.riverId
      }
      console.log(data);
      if(data.longitude===undefined){
      this.status = "Debe seleccionar ubicacion para la estacion";
      }else{
        var toPost = JSON.stringify(data);
        console.log(toPost);
        this.$http.post('http://mon.acmeapps.xyz:8080/EmuSensor/webapi/stations/add', toPost)
        .then(res => {

          //this.status = "datos enviados correctamente";
          console.log(res.status);
          if(res.status===204){
            this.success();
          }else{
            this.error();
          }
        });
}


  }
}

export default angular.module('flowSenseApp.addStation', [uiRouter])
  .config(routes)
  .component('addStation', {
    template: require('./addStation.html'),
    controller: AddStationComponent,
    controllerAs: 'addStationCtrl'
  })
  .name;
