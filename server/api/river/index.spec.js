'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var riverCtrlStub = {
  index: 'riverCtrl.index',
  show: 'riverCtrl.show',
  create: 'riverCtrl.create',
  upsert: 'riverCtrl.upsert',
  patch: 'riverCtrl.patch',
  destroy: 'riverCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var riverIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './river.controller': riverCtrlStub
});

describe('River API Router:', function() {
  it('should return an express router instance', function() {
    expect(riverIndex).to.equal(routerStub);
  });

  describe('GET /api/rivers', function() {
    it('should route to river.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'riverCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/rivers/:id', function() {
    it('should route to river.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'riverCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/rivers', function() {
    it('should route to river.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'riverCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/rivers/:id', function() {
    it('should route to river.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'riverCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/rivers/:id', function() {
    it('should route to river.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'riverCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/rivers/:id', function() {
    it('should route to river.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'riverCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
