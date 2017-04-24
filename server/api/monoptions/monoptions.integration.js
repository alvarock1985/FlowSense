'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newMonoptions;

describe('Monoptions API:', function() {
  describe('GET /api/monoptions', function() {
    var monoptionss;

    beforeEach(function(done) {
      request(app)
        .get('/api/monoptions')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          monoptionss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(monoptionss).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/monoptions', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/monoptions')
        .send({
          name: 'New Monoptions',
          info: 'This is the brand new monoptions!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newMonoptions = res.body;
          done();
        });
    });

    it('should respond with the newly created monoptions', function() {
      expect(newMonoptions.name).to.equal('New Monoptions');
      expect(newMonoptions.info).to.equal('This is the brand new monoptions!!!');
    });
  });

  describe('GET /api/monoptions/:id', function() {
    var monoptions;

    beforeEach(function(done) {
      request(app)
        .get(`/api/monoptions/${newMonoptions._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          monoptions = res.body;
          done();
        });
    });

    afterEach(function() {
      monoptions = {};
    });

    it('should respond with the requested monoptions', function() {
      expect(monoptions.name).to.equal('New Monoptions');
      expect(monoptions.info).to.equal('This is the brand new monoptions!!!');
    });
  });

  describe('PUT /api/monoptions/:id', function() {
    var updatedMonoptions;

    beforeEach(function(done) {
      request(app)
        .put(`/api/monoptions/${newMonoptions._id}`)
        .send({
          name: 'Updated Monoptions',
          info: 'This is the updated monoptions!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedMonoptions = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMonoptions = {};
    });

    it('should respond with the updated monoptions', function() {
      expect(updatedMonoptions.name).to.equal('Updated Monoptions');
      expect(updatedMonoptions.info).to.equal('This is the updated monoptions!!!');
    });

    it('should respond with the updated monoptions on a subsequent GET', function(done) {
      request(app)
        .get(`/api/monoptions/${newMonoptions._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let monoptions = res.body;

          expect(monoptions.name).to.equal('Updated Monoptions');
          expect(monoptions.info).to.equal('This is the updated monoptions!!!');

          done();
        });
    });
  });

  describe('PATCH /api/monoptions/:id', function() {
    var patchedMonoptions;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/monoptions/${newMonoptions._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Monoptions' },
          { op: 'replace', path: '/info', value: 'This is the patched monoptions!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedMonoptions = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedMonoptions = {};
    });

    it('should respond with the patched monoptions', function() {
      expect(patchedMonoptions.name).to.equal('Patched Monoptions');
      expect(patchedMonoptions.info).to.equal('This is the patched monoptions!!!');
    });
  });

  describe('DELETE /api/monoptions/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/monoptions/${newMonoptions._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when monoptions does not exist', function(done) {
      request(app)
        .delete(`/api/monoptions/${newMonoptions._id}`)
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
