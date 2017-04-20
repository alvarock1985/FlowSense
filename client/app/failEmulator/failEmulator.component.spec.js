'use strict';

describe('Component: FailEmulatorComponent', function() {
  // load the controller's module
  beforeEach(module('flowSenseApp.failEmulator'));

  var FailEmulatorComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    FailEmulatorComponent = $componentController('failEmulator', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
