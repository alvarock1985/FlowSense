'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './reports.routes';

export class ReportsComponent {
  $http;
  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
    this.targetHours = 5;
    this.stationId =  null;

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

  $onInit(){
    this.$http.get('http://mon.acmeapps.xyz:8080/EmuSensor/webapi/stations')
    .then(response => {
      this.stations = response.data;
    });
  }

  loadStationData(stationId, targetHours){
      this.$http.get('http://mon.acmeapps.xyz:8080/EmuSensor/webapi/stations/data/'+stationId+'/'+targetHours)
      .then(response =>{
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
}

export default angular.module('flowSenseApp.reports', [uiRouter])
  .config(routes)
  .component('reports', {
    template: require('./reports.html'),
    controller: ReportsComponent,
    controllerAs: 'reportsCtrl'
  })
  .name;
