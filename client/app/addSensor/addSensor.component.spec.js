'use strict';

describe('Component: AddSensorComponent', function() {
  // load the controller's module
  beforeEach(module('flowSenseApp.addSensor'));

  var AddSensorComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    AddSensorComponent = $componentController('addSensor', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
