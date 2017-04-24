'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var monoptionsCtrlStub = {
  index: 'monoptionsCtrl.index',
  show: 'monoptionsCtrl.show',
  create: 'monoptionsCtrl.create',
  upsert: 'monoptionsCtrl.upsert',
  patch: 'monoptionsCtrl.patch',
  destroy: 'monoptionsCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var monoptionsIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './monoptions.controller': monoptionsCtrlStub
});

describe('Monoptions API Router:', function() {
  it('should return an express router instance', function() {
    expect(monoptionsIndex).to.equal(routerStub);
  });

  describe('GET /api/monoptions', function() {
    it('should route to monoptions.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'monoptionsCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/monoptions/:id', function() {
    it('should route to monoptions.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'monoptionsCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/monoptions', function() {
    it('should route to monoptions.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'monoptionsCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/monoptions/:id', function() {
    it('should route to monoptions.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'monoptionsCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/monoptions/:id', function() {
    it('should route to monoptions.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'monoptionsCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/monoptions/:id', function() {
    it('should route to monoptions.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'monoptionsCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
