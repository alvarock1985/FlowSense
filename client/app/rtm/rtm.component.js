'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './rtm.routes';

export class RtmComponent {
  $interval;
  $scope;
  $http;

  /*@ngInject*/
  constructor($interval, $scope, $http) {
    this.$http = $http;
    this.$interval = $interval;
    this.$scope = $scope;
    this.valores = [];
    this.number = '';
    this.number2= '';
    this.dataSensor = [];
    $scope.labels = [];
    $scope.series = ["series A"];
    $scope.data = [[]];
    $scope.datasetOverride = [{
        yAxisID: 'y-axis-1',
        tension: 0,
        label: "My First dataset",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 10
    }, {
        yAxisID: 'y-axis-2',
        tension: 0
    }];
    $scope.options = {
        responsive : true,
        legend:{
          display: false
        },

        animation: {
          duration: 0
        },

        scales: {
            yAxes: [{
                id: 'y-axis-1',
                type: 'linear',
                display: true,
                position: 'left',
                ticks: {
                  max: 15
                }
            }, {
                id: 'y-axis-2',
                type: 'linear',
                display: true,
                position: 'right',
                ticks: {
                  max: 15
                }
            }]
        }
    };


  }

  $onInit(){
    this.loadSensorData();
    this.$interval(() => this.reloadData(), 5000)
  }


  randomNumber(){

    this.number2 = Math.round((Math.random()*20)+1);
    this.number++;
    console.log(this.number);
    this.$scope.labels.push(this.number);
    this.$scope.data[0].push(this.number2);
  }



  loadSensorData(){
    this.$http.get('http://mon.acmeapps.xyz:8080/EmuSensor/webapi/datasensors/last/30/57')
    .then(response => {
      this.dataSensor = response.data;
      for (var i in this.dataSensor){
        this.$scope.data[0].push(this.dataSensor[i].data);
        this.$scope.labels.push(this.dataSensor[i].timestamp);
      }
    })

    console.log(this.$scope.data[0]);
  }

  reloadData(){
    this.$scope.labels = this.$scope.labels.slice(1);
    this.$scope.data[0] = this.$scope.data[0].slice(1);
    this.$http.get('http://mon.acmeapps.xyz:8080/EmuSensor/webapi/datasensors/last/1/57')
    .then(response => {
      var value = response.data[0].data;
      this.$scope.data[0].push(value);
      this.$scope.labels.push(response.data[0].timestamp);
    })
  }


   getLiveChartData () {

        //console.log(this.$scope.dataSensor)
        // for(var i in this.$scope.dataSensor){
        //   this.$scope.data[0].push(this.$scope.dataSensor[i].data)
        // }



        //this.number2 = Math.round((Math.random()*20)+1);
        //this.$scope.data[0].push(this.number2);
        //console.log(this.$scope.data[0])
      }
    }




export default angular.module('flowSenseApp.rtm', [uiRouter])
  .config(routes)
  .component('rtm', {
    template: require('./rtm.html'),
    controller: RtmComponent,
    controllerAs: 'rtmCtrl'
  })
  .name;
