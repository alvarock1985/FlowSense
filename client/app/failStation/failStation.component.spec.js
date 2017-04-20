'use strict';

describe('Component: FailStationComponent', function() {
  // load the controller's module
  beforeEach(module('flowSenseApp.failStation'));

  var FailStationComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    FailStationComponent = $componentController('failStation', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
