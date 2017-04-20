'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('failSensor', {
      url: '/failSensor',
      template: '<fail-sensor></fail-sensor>'
    });
}
