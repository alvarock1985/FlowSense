'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('cosas', {
      url: '/cosas',
      template: '<cosas></cosas>'
    });
}
