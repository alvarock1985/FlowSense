'use strict';

import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';


import 'angular-socket-io';
import 'angular-google-maps';
import 'angular-simple-logger';
import 'angular-chart.js';


import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import 'angular-validation-match';

import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';
import maps from './maps/maps.component';
import infoWindow from './infoWindow/infoWindow.component';
import infoWindowController from './infoWindow/infoWindow.controller';
import Reports from './reports/reports.component';
import config from './config/config.component';
import addStation from './addStation/addStation.component';
import addSensor from './addSensor/addSensor.component';
import summary from './summary/summary.component';
import failEmulator from './failEmulator/failEmulator.component';
import failStation from './failStation/failStation.component';
import failSensor from './failSensor/failSensor.component';
import cosas from './cosas/cosas.component';
import parametros from './parametros/parametros.component';
import monitor from './monitor/monitor.component';
import about from './about/about.component';
import rtm from './rtm/rtm.component';
import client from './client/client.component';








import './app.scss';

angular.module('flowSenseApp', [ngCookies, ngResource, ngSanitize, 'btford.socket-io', uiRouter,
  uiBootstrap, _Auth, account, admin, 'validation.match', navbar, footer, main, constants,
  socket, util, maps, 'nemLogging', 'uiGmapgoogle-maps', ngAnimate, infoWindow, infoWindowController,
  'chart.js', Reports, config, addStation, addSensor, summary, failEmulator, failStation, failSensor,
  cosas, parametros, monitor, about, rtm, client


])
  .config(routeConfig)

  .config(function(uiGmapGoogleMapApiProvider) {
    'ngInject';
    uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyCACDsAHFTvNYxCCZDRgt-GMO12SH1n08k',
    v: '3.20', //defaults to latest 3.X anyhow
    libraries: 'weather,geometry,visualization'
  });
})


  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['flowSenseApp'], {
      strictDi: true
    });
  });
