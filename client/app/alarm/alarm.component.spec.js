'use strict';

describe('Component: AlarmComponent', function() {
  // load the controller's module
  beforeEach(module('flowSenseApp.alarm'));

  var AlarmComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    AlarmComponent = $componentController('alarm', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
