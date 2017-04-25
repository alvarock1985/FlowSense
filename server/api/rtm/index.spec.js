'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var rtmCtrlStub = {
  index: 'rtmCtrl.index',
  show: 'rtmCtrl.show',
  create: 'rtmCtrl.create',
  upsert: 'rtmCtrl.upsert',
  patch: 'rtmCtrl.patch',
  destroy: 'rtmCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var rtmIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './rtm.controller': rtmCtrlStub
});

describe('Rtm API Router:', function() {
  it('should return an express router instance', function() {
    expect(rtmIndex).to.equal(routerStub);
  });

  describe('GET /api/rtms', function() {
    it('should route to rtm.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'rtmCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/rtms/:id', function() {
    it('should route to rtm.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'rtmCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/rtms', function() {
    it('should route to rtm.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'rtmCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/rtms/:id', function() {
    it('should route to rtm.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'rtmCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/rtms/:id', function() {
    it('should route to rtm.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'rtmCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/rtms/:id', function() {
    it('should route to rtm.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'rtmCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
