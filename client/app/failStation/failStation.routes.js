'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('failStation', {
      url: '/failStation',
      template: '<fail-station></fail-station>'
    });
}
