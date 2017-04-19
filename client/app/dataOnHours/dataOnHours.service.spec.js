'use strict';

describe('Service: dataOnHours', function() {
  // load the service's module
  beforeEach(module('flowSenseApp.dataOnHours'));

  // instantiate service
  var dataOnHours;
  beforeEach(inject(function(_dataOnHours_) {
    dataOnHours = _dataOnHours_;
  }));

  it('should do something', function() {
    expect(!!dataOnHours).to.be.true;
  });
});
