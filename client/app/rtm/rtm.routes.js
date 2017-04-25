'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('rtm', {
      url: '/rtm',
      template: '<rtm></rtm>'
    });
}
