'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './maps.routes';

export class MapsComponent {
  $http;
  $scope;
  /*@ngInject*/
  constructor($http, $scope) {
    this.$http = $http;
    this.pinColor = "00FF00";
    this.markers = [];
    this.watershedId = 1;
    this.targetHours = 5;
    this.icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2%7C'+this.pinColor;
    this.value = 100;
    $scope.window = {
        model: {},
        show: false,
        options: {
            pixelOffset: {width: -1, height: -20},
            maxWidth: 500,

        }
      }

    this.map = {
      center: {latitude: -27.3771861, longitude:-70.3560286 },
        zoom: 7,
        control: {},
        window: $scope.window,
        markerOptions: {

        },
        markers: this.markers,
        markersEvents:{
                click: function(marker, eventName, model, args){
                $scope.window.model = model;
                console.log($scope.window.show);

                $scope.window.show = true;
            }
        }
    }

    this.labels = ["Bajo", "Medio", "Alto", "Max" ];
      this.series = ['Caudal'];

      this.onClick = function (points, evt) {
          console.log(points, evt);
      };
      this.datasetOverride = [

          {
              xAxisID: 'x-axis-1',
              showLines : true,
              lineTension: 0
          },
          {
              yAxisID: 'y-axis-1',
              showLines: true,
              lineTension: 0
          }
      ];
      this.options = {
          scales: {

              xAxes: [
                  {
                      id: 'x-axis-1',
                      type: 'linear',
                      position: 'bottom',
                      showLines: true,
                      lineTension: 0,
                  },
                  {
                      id: 'x-axis-2',
                      position:'top',
                      display: true
                  }
              ],
              yAxes: [
                  {
                      id: 'y-axis-1',
                      showLines: true,
                      display: false,
                      lineTension: 0
                  }

              ]
          }
      };
  }

  $onInit(){
      var sensors;
      this.$http.get('http://mon.acmeapps.xyz:8080/EmuSensor/webapi/rivers')
      .then(response => {
        this.rivers = response.data;
      });

      this.$http.get('http://mon.acmeapps.xyz:8080/EmuSensor/webapi/stations')
      .then(response =>{
        this.stations = response.data;
      })

      this.$http.get('http://mon.acmeapps.xyz:8080/EmuSensor/webapi/sensors')
      .then(response =>{
        this.sensors = response.data;
      })

  }


  loadRiverData(watershedId, targetHours){
    this.$http.get('http://mon.acmeapps.xyz:8080/EmuSensor/webapi/stations/'+this.watershedId)
    .then(response => {
      this.markers = response.data;
      console.log(this.markers)
      for(var i in this.markers){
                  if(this.markers[i].status==="FAIL"){
                      this.markers[i].icon = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2%7CFF0000"
                  }else if(this.markers[i].status==="WARN"){
                      this.markers[i].icon = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2%7CFFFF00"
                  }else {
                      this.markers[i].icon = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2%7C00FF00"
                  }
              }
    });

    this.$http.get('http://mon.acmeapps.xyz:8080/EmuSensor/webapi/quartile/last/'+watershedId)
    .then(response =>{
      this.quartiles = response.data;
      this.cauMin = this.quartiles.cauMin;
      this.cauLow = this.quartiles.cauLow;
      this.cauLowMid = (this.quartiles.cauMid + this.quartiles.cauLow)/2;
      this.cauMid = this.quartiles.cauMid;
      this.cauMidHigh = (this.quartiles.cauHigh + this.quartiles.cauMid)/2;
      this.cauHigh = this.quartiles.cauHigh;
      this.cauMax = this.quartiles.cauMax;

      this.tempMin = this.quartiles.tempMin;
      this.tempLow = this.quartiles.tempLow;
      this.tempLowMid = (this.quartiles.tempMid + this.quartiles.tempLow)/2;
      this.tempMid = this.quartiles.cauMid;
      this.tempMidHigh = (this.quartiles.tempHigh + this.quartiles.tempMid)/2;
      this.tempHigh = this.quartiles.tempHigh;
      this.tempMax = this.quartiles.tempMax;


      this.humMin = this.quartiles.humMin;
      this.humLow = this.quartiles.humLow;
      this.humLowMid = (this.quartiles.humMid + this.quartiles.humLow)/2;
      this.humMid = this.quartiles.cauMid;
      this.humMidHigh = (this.quartiles.humHigh + this.quartiles.humMid)/2;
      this.humHigh = this.quartiles.humHigh;
      this.humMax = this.quartiles.humMax;


      this.prepMin = this.quartiles.prepMin;
      this.prepLow = this.quartiles.prepLow;
      this.prepLowMid = (this.quartiles.prepMid + this.quartiles.prepLow)/2;
      this.prepMid = this.quartiles.cauMid;
      this.prepMidHigh = (this.quartiles.prepHigh + this.quartiles.prepMid)/2;
      this.prepHigh = this.quartiles.prepHigh;
      this.prepMax = this.quartiles.prepMax;


      this.otherMin = this.quartiles.otherMin;
      this.otherLow = this.quartiles.otherLow;
      this.otherLowMid = (this.quartiles.otherMid + this.quartiles.otherLow)/2;
      this.otherMid = this.quartiles.cauMid;
      this.otherMidHigh = (this.quartiles.otherHigh + this.quartiles.otherMid)/2;
      this.otherHigh = this.quartiles.otherHigh;
      this.otherMax = this.quartiles.otherMax;


      this.dataCau = [
          [{x:this.cauLow, y:1}, {x:this.cauMid, y:0},{x:this.cauLowMid, y:0},
              {x:this.cauMid, y:1},{x:this.cauMidHigh, y:0},
              {x:this.cauMid, y:0},{x:this.cauHigh, y:1},
              {x:this.cauMax, y:1}]
      ];

      this.dataHum = [
          [{x:this.humLow, y:1}, {x:this.humMid, y:0},{x:this.humLowMid, y:0},
              {x:this.humMid, y:1},{x:this.humMidHigh, y:0},
              {x:this.humMid, y:0},{x:this.humHigh, y:1},
              {x:this.humMax, y:1}]
      ];

      this.dataTemp = [
          [{x:this.tempLow, y:1}, {x:this.tempMid, y:0},{x:this.tempLowMid, y:0},
              {x:this.tempMid, y:1},{x:this.tempMidHigh, y:0},
              {x:this.tempMid, y:0},{x:this.tempHigh, y:1},
              {x:this.tempMax, y:1}]
      ];

      this.dataPrep = [
          [{x:this.prepLow, y:1}, {x:this.prepMid, y:0},{x:this.prepLowMid, y:0},
              {x:this.prepMid, y:1},{x:this.prepMidHigh, y:0},
              {x:this.prepMid, y:0},{x:this.prepHigh, y:1},
              {x:this.prepMax, y:1}]
      ];

      this.dataOther = [
          [{x:this.otherLow, y:1}, {x:this.otherMid, y:0},{x:this.otherLowMid, y:0},
              {x:this.otherMid, y:1},{x:this.otherMidHigh, y:0},
              {x:this.otherMid, y:0},{x:this.otherHigh, y:1},
              {x:this.otherMax, y:1}]
            ];

          });
    this.$http.get('http://mon.acmeapps.xyz:8080/EmuSensor/webapi/dataonhours/'+targetHours+'/'+watershedId)
      .then(response => {
        this.avgData = response.data;

      });
    }






}

export default angular.module('flowSenseApp.maps', [uiRouter, 'uiGmapgoogle-maps'])
  .config(routes)
  .component('maps', {
    template: require('./maps.html'),
    controller: MapsComponent,
    controllerAs: 'mapsCtrl'
  })
  .name;
