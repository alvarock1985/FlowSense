'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('infoWindow', {
      url: '/infoWindow',
      template: '<info-window></info-window>'
    });
}
