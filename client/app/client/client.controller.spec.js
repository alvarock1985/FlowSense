'use strict';

describe('Controller: ClientCtrl', function() {
  // load the controller's module
  beforeEach(module('flowSenseApp.client'));

  var ClientCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    ClientCtrl = $controller('ClientCtrl', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
