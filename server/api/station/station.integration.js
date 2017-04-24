'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newStation;

describe('Station API:', function() {
  describe('GET /api/stations', function() {
    var stations;

    beforeEach(function(done) {
      request(app)
        .get('/api/stations')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          stations = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(stations).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/stations', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/stations')
        .send({
          name: 'New Station',
          info: 'This is the brand new station!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newStation = res.body;
          done();
        });
    });

    it('should respond with the newly created station', function() {
      expect(newStation.name).to.equal('New Station');
      expect(newStation.info).to.equal('This is the brand new station!!!');
    });
  });

  describe('GET /api/stations/:id', function() {
    var station;

    beforeEach(function(done) {
      request(app)
        .get(`/api/stations/${newStation._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          station = res.body;
          done();
        });
    });

    afterEach(function() {
      station = {};
    });

    it('should respond with the requested station', function() {
      expect(station.name).to.equal('New Station');
      expect(station.info).to.equal('This is the brand new station!!!');
    });
  });

  describe('PUT /api/stations/:id', function() {
    var updatedStation;

    beforeEach(function(done) {
      request(app)
        .put(`/api/stations/${newStation._id}`)
        .send({
          name: 'Updated Station',
          info: 'This is the updated station!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedStation = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedStation = {};
    });

    it('should respond with the updated station', function() {
      expect(updatedStation.name).to.equal('Updated Station');
      expect(updatedStation.info).to.equal('This is the updated station!!!');
    });

    it('should respond with the updated station on a subsequent GET', function(done) {
      request(app)
        .get(`/api/stations/${newStation._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let station = res.body;

          expect(station.name).to.equal('Updated Station');
          expect(station.info).to.equal('This is the updated station!!!');

          done();
        });
    });
  });

  describe('PATCH /api/stations/:id', function() {
    var patchedStation;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/stations/${newStation._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Station' },
          { op: 'replace', path: '/info', value: 'This is the patched station!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedStation = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedStation = {};
    });

    it('should respond with the patched station', function() {
      expect(patchedStation.name).to.equal('Patched Station');
      expect(patchedStation.info).to.equal('This is the patched station!!!');
    });
  });

  describe('DELETE /api/stations/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/stations/${newStation._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when station does not exist', function(done) {
      request(app)
        .delete(`/api/stations/${newStation._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
