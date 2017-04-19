'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('maps', {
      url: '/maps',
      template: '<maps></maps>'
    });
}
