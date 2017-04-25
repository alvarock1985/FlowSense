'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newRtm;

describe('Rtm API:', function() {
  describe('GET /api/rtms', function() {
    var rtms;

    beforeEach(function(done) {
      request(app)
        .get('/api/rtms')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          rtms = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(rtms).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/rtms', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/rtms')
        .send({
          name: 'New Rtm',
          info: 'This is the brand new rtm!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newRtm = res.body;
          done();
        });
    });

    it('should respond with the newly created rtm', function() {
      expect(newRtm.name).to.equal('New Rtm');
      expect(newRtm.info).to.equal('This is the brand new rtm!!!');
    });
  });

  describe('GET /api/rtms/:id', function() {
    var rtm;

    beforeEach(function(done) {
      request(app)
        .get(`/api/rtms/${newRtm._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          rtm = res.body;
          done();
        });
    });

    afterEach(function() {
      rtm = {};
    });

    it('should respond with the requested rtm', function() {
      expect(rtm.name).to.equal('New Rtm');
      expect(rtm.info).to.equal('This is the brand new rtm!!!');
    });
  });

  describe('PUT /api/rtms/:id', function() {
    var updatedRtm;

    beforeEach(function(done) {
      request(app)
        .put(`/api/rtms/${newRtm._id}`)
        .send({
          name: 'Updated Rtm',
          info: 'This is the updated rtm!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedRtm = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRtm = {};
    });

    it('should respond with the updated rtm', function() {
      expect(updatedRtm.name).to.equal('Updated Rtm');
      expect(updatedRtm.info).to.equal('This is the updated rtm!!!');
    });

    it('should respond with the updated rtm on a subsequent GET', function(done) {
      request(app)
        .get(`/api/rtms/${newRtm._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let rtm = res.body;

          expect(rtm.name).to.equal('Updated Rtm');
          expect(rtm.info).to.equal('This is the updated rtm!!!');

          done();
        });
    });
  });

  describe('PATCH /api/rtms/:id', function() {
    var patchedRtm;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/rtms/${newRtm._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Rtm' },
          { op: 'replace', path: '/info', value: 'This is the patched rtm!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedRtm = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedRtm = {};
    });

    it('should respond with the patched rtm', function() {
      expect(patchedRtm.name).to.equal('Patched Rtm');
      expect(patchedRtm.info).to.equal('This is the patched rtm!!!');
    });
  });

  describe('DELETE /api/rtms/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/rtms/${newRtm._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when rtm does not exist', function(done) {
      request(app)
        .delete(`/api/rtms/${newRtm._id}`)
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
