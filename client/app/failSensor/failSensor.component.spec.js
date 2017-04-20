'use strict';

describe('Component: FailSensorComponent', function() {
  // load the controller's module
  beforeEach(module('flowSenseApp.failSensor'));

  var FailSensorComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    FailSensorComponent = $componentController('failSensor', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
