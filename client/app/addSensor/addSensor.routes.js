'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('addSensor', {
      url: '/addSensor',
      template: '<add-sensor></add-sensor>'
    });
}
