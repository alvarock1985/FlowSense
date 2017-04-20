'use strict';

describe('Component: AddStationComponent', function() {
  // load the controller's module
  beforeEach(module('flowSenseApp.addStation'));

  var AddStationComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    AddStationComponent = $componentController('addStation', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
