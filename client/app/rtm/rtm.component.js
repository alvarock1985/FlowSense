'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './rtm.routes';

export class RtmComponent {
  $interval;
  $scope;

  /*@ngInject*/
  constructor($interval, $scope) {
    this.$interval = $interval;
    this.$scope = $scope;
    this.valores = [];
    this.number = '';
    this.number2= '';

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
                position: 'left'
            }, {
                id: 'y-axis-2',
                type: 'linear',
                display: true,
                position: 'right'
            }]
        }
    };


  }

  $onInit(){
    this.$interval(() =>this.getLiveChartData(), 1000)
  }


  randomNumber(){

    this.number2 = Math.round((Math.random()*20)+1);
    this.number++;
    console.log(this.number);
    this.$scope.labels.push(this.number);
    this.$scope.data[0].push(this.number2);
  }



   getLiveChartData () {
     var maximum = 50;
      if (this.$scope.data[0].length) {
        this.$scope.labels = this.$scope.labels.slice(1);
        this.$scope.data[0] = this.$scope.data[0].slice(1);
      }

      while (this.$scope.data[0].length < maximum) {
        this.$scope.labels.push('');
        this.number2 = Math.round((Math.random()*20)+1);
        this.$scope.data[0].push(this.number2);
      }
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
