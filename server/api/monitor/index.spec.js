'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var monitorCtrlStub = {
  index: 'monitorCtrl.index',
  show: 'monitorCtrl.show',
  create: 'monitorCtrl.create',
  upsert: 'monitorCtrl.upsert',
  patch: 'monitorCtrl.patch',
  destroy: 'monitorCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var monitorIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './monitor.controller': monitorCtrlStub
});

describe('Monitor API Router:', function() {
  it('should return an express router instance', function() {
    expect(monitorIndex).to.equal(routerStub);
  });

  describe('GET /api/monitors', function() {
    it('should route to monitor.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'monitorCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/monitors/:id', function() {
    it('should route to monitor.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'monitorCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/monitors', function() {
    it('should route to monitor.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'monitorCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/monitors/:id', function() {
    it('should route to monitor.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'monitorCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/monitors/:id', function() {
    it('should route to monitor.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'monitorCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/monitors/:id', function() {
    it('should route to monitor.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'monitorCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
