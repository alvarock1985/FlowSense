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
    this.labels = [];
    this.data = [];
    this.series = [];
    this.onClick = function (points, evt) {
        console.log(points, evt);
    };
    this.datasetOverride = [{ yAxisID: 'y-axis-1',tension:0 , showLines: true}, { yAxisID: 'y-axis-2', tension:0, showLines: true}];
    this.options = {
        responsive:true,
        scales: {
            yAxes: [
                {
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left',
                    showLines: true,
                    tension: 0,
                    ticks: {
                        max:30
                    }
                },
                {
                    id: 'y-axis-2',
                    type: 'linear',
                    display: true,
                    showLines: true,
                    tension: 0,
                    position: 'right',
                    ticks: {
                        max:30
                    }
                }
            ],
            xAxes : [{
                display: true,

                position: 'bottom',
                lineTension: 0,
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
    this.$interval(() =>this.randomNumber(), 1000)
  }

  randomNumber(){

    this.number2 = Math.round((Math.random()*20)+1);
    this.number++;
    console.log(this.number);
    this.labels.push(this.number);
    this.data.push(this.number2);
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
