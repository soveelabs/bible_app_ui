var nock = require('nock'),
    config = require('../../../config/config'),
    setup = require('../../setup'),
    request = require('supertest'),
    Alchemy = require('../../../lib/alchemy'),
    authFixtures = require('../../fixtures/auth_fixture'),
    app = require('../../../app');

describe('/translations', function(){
  beforeEach(function(){
    nock(process.env.AUTH_HOST)
      .filteringPath(function(path){
        return '/';
      })
      .get("/")
      .reply(200, authFixtures.validateTokenResponse);

    nock(process.env.AUTH_HOST)
      .filteringPath(function(path){
        return '/languages';
      })
      .get("/languages")
      .reply(200, authFixtures.languagesResponse);
  });

  describe('/text', function() {

    describe('when all params present', function() {
      it('should return translation', function(done){
        var query = {text: 'yes', from: 'en', to: 'es', customer: 'firma8'};

        nock(config.alchemy_host)
          .filteringPath(function(path){
            return '/';
          })
          .get("/")
          .reply(200, 'si');

        request(app)
          .get('/api/1.0/translations/text')
          .query(query)
          .end(function(err, res){
            expect(res.body).to.eql('si');
            expect(res.statusCode).to.eql(200);
            done();
          });
      });
    });

    describe('when alchemy returns non 200', function() {
      it('should return alchemy error message and status code', function(done){
        var query = {text: 'yes', from: 'en', to: 'es', customer: 'firma8'};

        nock(config.alchemy_host)
          .filteringPath(function(path){
            return '/';
          })
          .get("/")
          .reply(400, 'missing params');

        request(app)
          .get('/api/1.0/translations/text')
          .query(query)
          .end(function(err, res){
            expect(res.body).to.eql('missing params');
            expect(res.statusCode).to.eql(400);
            done();
          });
      });
    });

    describe('when request has error', function() {
      it('should return error message and status code of 500', function(done){
        var query = {text: 'yes', from: 'en', to: 'es', customer: 'firma8'};

        setup.sandbox.stub(Alchemy.translate, 'text').callsArgWith(5, 'error', null);

        request(app)
          .get('/api/1.0/translations/text')
          .query(query)
          .end(function(err, res){
            expect(res.body).to.eql({error: 'error'});
            expect(res.statusCode).to.eql(500);
            done();
          });
      });
    });

  });

  describe('/html', function() {

    describe('when all params present', function() {
      it('should return translation', function(done){
        var query = {html: '<p>yes</p>', from: 'en', to: 'es', customer: 'firma8'};

        nock(config.alchemy_host)
          .filteringPath(function(path){
            return '/';
          })
          .get("/")
          .reply(200, '<p>si</p>');

        request(app)
          .get('/api/1.0/translations/html')
          .query(query)
          .end(function(err, res){
            expect(res.body).to.eql('<p>si</p>');
            expect(res.statusCode).to.eql(200);
            done();
          });
      });
    });

    describe('when alchemy returns non 200', function() {
      it('should return alchemy error message and status code', function(done){
        var query = {html: '<p>yes</p>', from: 'en', to: 'es', customer: 'firma8'};

        nock(config.alchemy_host)
          .filteringPath(function(path){
            return '/';
          })
          .get("/")
          .reply(400, 'missing params');

        request(app)
          .get('/api/1.0/translations/html')
          .query(query)
          .end(function(err, res){
            expect(res.body).to.eql('missing params');
            expect(res.statusCode).to.eql(400);
            done();
          });
      });
    });

    describe('when request has error', function() {
      it('should return error message and status code of 500', function(done){
        var query = {html: '<p>yes</p>', from: 'en', to: 'es', customer: 'firma8'};

        setup.sandbox.stub(Alchemy.translate, 'htmlFragment').callsArgWith(5, 'error', null);

        request(app)
          .get('/api/1.0/translations/html')
          .query(query)
          .end(function(err, res){
            expect(res.body).to.eql({error: 'error'});
            expect(res.statusCode).to.eql(500);
            done();
          });
      });
    });

  });
});
