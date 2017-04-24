'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('parametros', {
      url: '/parametros',
      template: '<parametros></parametros>'
    });
}
