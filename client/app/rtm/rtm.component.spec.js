'use strict';

describe('Component: RtmComponent', function() {
  // load the controller's module
  beforeEach(module('flowSenseApp.rtm'));

  var RtmComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    RtmComponent = $componentController('rtm', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
