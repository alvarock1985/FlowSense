'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('config', {
      url: '/config',
      template: '<config></config>'
    });
}
