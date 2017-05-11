'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('client', {
      url: '/client',
      template: '<client></client>'
    });
}
