'use strict';

describe('Service: stationData', function() {
  // load the service's module
  beforeEach(module('flowSenseApp.stationData'));

  // instantiate service
  var stationData;
  beforeEach(inject(function(_stationData_) {
    stationData = _stationData_;
  }));

  it('should do something', function() {
    expect(!!stationData).to.be.true;
  });
});
