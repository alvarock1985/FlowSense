'use strict';

describe('Service: quartileData', function() {
  // load the service's module
  beforeEach(module('flowSenseApp.quartileData'));

  // instantiate service
  var quartileData;
  beforeEach(inject(function(_quartileData_) {
    quartileData = _quartileData_;
  }));

  it('should do something', function() {
    expect(!!quartileData).to.be.true;
  });
});
