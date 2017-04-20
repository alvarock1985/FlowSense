'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('addStation', {
      url: '/addStation',
      template: '<add-station></add-station>'
    });
}
