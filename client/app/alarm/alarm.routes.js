'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('alarm', {
      url: '/alarm',
      template: '<alarm></alarm>'
    });
}
