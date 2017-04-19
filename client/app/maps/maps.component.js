'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './maps.routes';

export class MapsComponent {
  /*@ngInject*/
  constructor() {
    this.pinColor = "00FF00";
    this.markers = [];
    this.id = 1;
    this.target2 = 5;
    this.icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2%7C'+this.pinColor;


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
        markerOptions: {

        },
        markers: this.markers,
        markersEvents:{
                click: function(marker, eventName, model, args){
                this.map.window.model = model;
                this.map.window.show = true;
            }
        }
    }
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
