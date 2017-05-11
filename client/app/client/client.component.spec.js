'use strict';

describe('Component: ClientComponent', function() {
  // load the controller's module
  beforeEach(module('flowSenseApp.client'));

  var ClientComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ClientComponent = $componentController('client', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
