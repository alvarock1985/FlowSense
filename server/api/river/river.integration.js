'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newRiver;

describe('River API:', function() {
  describe('GET /api/rivers', function() {
    var rivers;

    beforeEach(function(done) {
      request(app)
        .get('/api/rivers')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          rivers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(rivers).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/rivers', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/rivers')
        .send({
          name: 'New River',
          info: 'This is the brand new river!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newRiver = res.body;
          done();
        });
    });

    it('should respond with the newly created river', function() {
      expect(newRiver.name).to.equal('New River');
      expect(newRiver.info).to.equal('This is the brand new river!!!');
    });
  });

  describe('GET /api/rivers/:id', function() {
    var river;

    beforeEach(function(done) {
      request(app)
        .get(`/api/rivers/${newRiver._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          river = res.body;
          done();
        });
    });

    afterEach(function() {
      river = {};
    });

    it('should respond with the requested river', function() {
      expect(river.name).to.equal('New River');
      expect(river.info).to.equal('This is the brand new river!!!');
    });
  });

  describe('PUT /api/rivers/:id', function() {
    var updatedRiver;

    beforeEach(function(done) {
      request(app)
        .put(`/api/rivers/${newRiver._id}`)
        .send({
          name: 'Updated River',
          info: 'This is the updated river!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedRiver = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRiver = {};
    });

    it('should respond with the updated river', function() {
      expect(updatedRiver.name).to.equal('Updated River');
      expect(updatedRiver.info).to.equal('This is the updated river!!!');
    });

    it('should respond with the updated river on a subsequent GET', function(done) {
      request(app)
        .get(`/api/rivers/${newRiver._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let river = res.body;

          expect(river.name).to.equal('Updated River');
          expect(river.info).to.equal('This is the updated river!!!');

          done();
        });
    });
  });

  describe('PATCH /api/rivers/:id', function() {
    var patchedRiver;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/rivers/${newRiver._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched River' },
          { op: 'replace', path: '/info', value: 'This is the patched river!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedRiver = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedRiver = {};
    });

    it('should respond with the patched river', function() {
      expect(patchedRiver.name).to.equal('Patched River');
      expect(patchedRiver.info).to.equal('This is the patched river!!!');
    });
  });

  describe('DELETE /api/rivers/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/rivers/${newRiver._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when river does not exist', function(done) {
      request(app)
        .delete(`/api/rivers/${newRiver._id}`)
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
