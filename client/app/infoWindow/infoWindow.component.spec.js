'use strict';

describe('Component: InfoWindowComponent', function() {
  // load the controller's module
  beforeEach(module('flowSenseApp.infoWindow'));

  var InfoWindowComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    InfoWindowComponent = $componentController('infoWindow', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
