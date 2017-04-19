'use strict';

describe('Service: riverData', function() {
  // load the service's module
  beforeEach(module('flowSenseApp.riverData'));

  // instantiate service
  var riverData;
  beforeEach(inject(function(_riverData_) {
    riverData = _riverData_;
  }));

  it('should do something', function() {
    expect(!!riverData).to.be.true;
  });
});
