'use strict';

describe('Component: ParametrosComponent', function() {
  // load the controller's module
  beforeEach(module('flowSenseApp.parametros'));

  var ParametrosComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ParametrosComponent = $componentController('parametros', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
