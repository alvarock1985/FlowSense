'use strict';

describe('Component: CosasComponent', function() {
  // load the controller's module
  beforeEach(module('flowSenseApp.cosas'));

  var CosasComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    CosasComponent = $componentController('cosas', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
