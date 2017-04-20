'use strict';

describe('Component: ConfigComponent', function() {
  // load the controller's module
  beforeEach(module('flowSenseApp.config'));

  var ConfigComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ConfigComponent = $componentController('config', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
