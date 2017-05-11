'use strict';
const angular = require('angular');

/*@ngInject*/
export function infoWindowController($http) {
  this.message = 'Hello';
  this.stationId = null;
  this.cauStatus = null;
  this.tempStatus = null;
  this.humStatus = null;
  this.snowStatus = null;
  this.precipStatus = null;
  this.hola = "hola";
  this.okIcon = 'http://keysizetest.verisignlabs.com/check.png';
  this.failIcon = 'https://www.okentes.cz/inshop/Layout/Pages/__Images/red_cross.png';

  this.init = function(stationId){
    this.stationId = stationId;
    this.getData(this.stationId);
    this.checkStatus(this.stationId);
  }

  this.checkStatus = function(stationId){
      $http.get('http://mon.acmeapps.xyz:8080/EmuSensor/webapi/sensors/'+stationId)
          .then(response =>{
            var sensors = response.data;
            console.log(sensors);
            for(var i in sensors){
              if(sensors[i].name === 'caudal'){
                    this.cauStatus = sensors[i].status;
                    if(this.cauStatus === 'FAIL'){
                        this.cauStatusIcon = this.failIcon;
                    }else{
                        this.cauStatusIcon = this.okIcon;
                    }
                }else if(sensors[i].name === 'temp'){
                    this.tempStatus = sensors[i].status;
                    if(this.tempStatus === 'FAIL'){
                        this.tempStatusIcon = this.failIcon;
                    }else{
                        this.tempStatusIcon = this.okIcon;
                    }
                }else if(sensors[i].name === 'hum'){
                    this.humStatus = sensors[i].status;
                    if(this.humStatus === 'FAIL'){
                        this.humStatusIcon = this.failIcon;
                    }else{
                        this.humStatusIcon = this.okIcon;
                    }
                }else if(sensors[i].name === 'precip'){
                    this.precipStatus = sensors[i].status;
                    if(this.precipStatus === 'FAIL'){
                        this.precipStatusIcon = this.failIcon;
                    }else{
                        this.precipStatusIcon = this.okIcon;
                    }
                }else{
                    this.snowStatus = sensors[i].status;
                    if(this.snowStatus === 'FAIL'){
                        this.snowStatusIcon = this.failIcon;
                    }else{
                        this.snowStatusIcon = this.okIcon;
                    }
                }

                }
              })
        };

  this.getData = function(stationId){

    $http.get('http://mon.acmeapps.xyz:8080/EmuSensor/webapi/stations/data/'+stationId)
    .then(response => {
      var stationData = response.data[0];
      console.log(stationData);

      this.posData = [];
      this.labels = stationData.dataTimestamp;

      var tempdata = stationData.dataArrayTemp;
      this.posData.push(tempdata);
      var humData = stationData.dataArrayHum;
      this.posData.push(humData);
      var cauData = stationData.dataArrayHum;
      this.posData.push(cauData);

    });
  }

  this.series = ['Temperatura', 'Humedad', 'Caudal'];
  this.onClick = function (points, evt) {
      console.log(points, evt);
  };
  this.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  this.options = {
      responsive: true,
      scales: {
          yAxes: [
              {
                  id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left',
                  ticks: {
                      max:30
                  }
              },
              {
                  id: 'y-axis-2',
                  type: 'linear',
                  display: true,
                  position: 'right',
                  ticks:{
                      max:30
                  }
              }
          ],

          xAxes : [{

              display: true,
              position: 'bottom',
              ticks: {
                  minRotation: 90,
                  maxRotation: 90


              }

          }],

          legend: [{
              display:true

          }]
      }
  };
}

export default angular.module('flowSenseApp.infoWindow', [])
  .controller('InfoWindowController', infoWindowController)
  .name;
