'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var stationCtrlStub = {
  index: 'stationCtrl.index',
  show: 'stationCtrl.show',
  create: 'stationCtrl.create',
  upsert: 'stationCtrl.upsert',
  patch: 'stationCtrl.patch',
  destroy: 'stationCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var stationIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './station.controller': stationCtrlStub
});

describe('Station API Router:', function() {
  it('should return an express router instance', function() {
    expect(stationIndex).to.equal(routerStub);
  });

  describe('GET /api/stations', function() {
    it('should route to station.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'stationCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/stations/:id', function() {
    it('should route to station.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'stationCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/stations', function() {
    it('should route to station.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'stationCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/stations/:id', function() {
    it('should route to station.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'stationCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/stations/:id', function() {
    it('should route to station.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'stationCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/stations/:id', function() {
    it('should route to station.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'stationCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
