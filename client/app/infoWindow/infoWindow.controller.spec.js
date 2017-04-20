'use strict';

describe('Controller: InfoWindowCtrl', function() {
  // load the controller's module
  beforeEach(module('flowSenseApp.infoWindow'));

  var InfoWindowCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    InfoWindowCtrl = $controller('InfoWindowCtrl', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
