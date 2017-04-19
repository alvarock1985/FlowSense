'use strict';

describe('Service: dataArray', function() {
  // load the service's module
  beforeEach(module('flowSenseApp.dataArray'));

  // instantiate service
  var dataArray;
  beforeEach(inject(function(_dataArray_) {
    dataArray = _dataArray_;
  }));

  it('should do something', function() {
    expect(!!dataArray).to.be.true;
  });
});
