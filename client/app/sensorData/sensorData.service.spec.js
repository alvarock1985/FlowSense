'use strict';

describe('Service: sensorData', function() {
  // load the service's module
  beforeEach(module('flowSenseApp.sensorData'));

  // instantiate service
  var sensorData;
  beforeEach(inject(function(_sensorData_) {
    sensorData = _sensorData_;
  }));

  it('should do something', function() {
    expect(!!sensorData).to.be.true;
  });
});
