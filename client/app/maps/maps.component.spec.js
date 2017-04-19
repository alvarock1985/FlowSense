'use strict';

describe('Component: MapsComponent', function() {
  // load the controller's module
  beforeEach(module('flowSenseApp.maps'));

  var MapsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    MapsComponent = $componentController('maps', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
