var nock = require('nock'),
    config = require('../../../config/config'),
    setup = require('../../setup'),
    authFixtures = require('../../fixtures/auth_fixture'),
    detectFixtures = require('../../fixtures/detect_fixture'),
    request = require('supertest'),
    Alchemy = require('../../../lib/alchemy'),
    Auth = require('../../../lib/auth'),
    app = require('../../../app');

describe('/languages', function(){
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

  describe('/', function() {

    describe('when customer exists', function() {
      it('should return languages', function(done){
        var query = {customer: 'firma8'};

        request(app)
          .get('/api/1.0/languages')
          .query(query)
          .end(function(err, res){
            expect(res.statusCode).to.eql(200);
            expect(res.body).to.eql([
              {
                "code": "en",
                "name": "English",
                "direction": "ltr"
              },
              {
                "code": "es",
                "name": "Spanish",
                "direction": "ltr"
              },
              {
                "code": "de",
                "name": "German",
                "direction": "ltr"
              }
            ]);
            done();
          });
      });
    });

    describe('when does not customer exists', function() {
      it('should return empty array', function(done){
        var query = {customer: 'fake'};

        request(app)
          .get('/api/1.0/languages')
          .query(query)
          .end(function(err, res){
            expect(res.statusCode).to.eql(200);
            expect(res.body).to.eql([]);
            done();
          });
      });
    });

    describe('when findLanguagesBycustomer has err', function() {
      it('should return a 500 with err message', function(done){
        var query = {customer: 'firma8'};

        setup.sandbox.stub(Auth, 'findLanguagesByCustomer').callsArgWith(2, 'error', null);

        request(app)
          .get('/api/1.0/languages')
          .query(query)
          .end(function(err, res){
            expect(res.statusCode).to.eql(500);
            expect(res.body).to.eql({error: 'error'});
            done();
          });
      });
    });

    describe('when convertLanguageCodes has err', function() {
      it('should return a 500 with err message', function(done){
        var query = {customer: 'firma8'};

        setup.sandbox.stub(Auth, 'convertLanguageCodes').callsArgWith(2, 'error', null);

        request(app)
          .get('/api/1.0/languages')
          .query(query)
          .end(function(err, res){
            expect(res.statusCode).to.eql(500);
            expect(res.body).to.eql({error: 'error'});
            done();
          });
      });
    });

  });

  describe('/detect', function() {

    describe('when language exists', function(done) {
      it('should return an array of languages', function(done) {
        nock(config.detect_language_host)
          .filteringPath(function(path){
            return '/';
          })
          .get("/")
          .reply(200, detectFixtures.englishResponse);

        var query = {text: 'hello'};

        request(app)
          .get('/api/1.0/languages/detect')
          .query(query)
          .end(function(err, res){
            expect(res.statusCode).to.eql(200);
            expect(res.body).to.eql([{
              "code": "en",
              "name": "English",
              "direction": "ltr",
              "confidence": detectFixtures.englishResponse.data.detections[0].confidence
            }]);
            done();
          });
      });
    });

    describe('when convertLanguageCodes has err', function(done) {
      it('should return 500 with error message', function(done) {
        nock(config.detect_language_host)
          .filteringPath(function(path){
            return '/';
          })
          .get("/")
          .reply(200, detectFixtures.englishResponse);

        var query = {text: 'hello'};

        setup.sandbox.stub(Auth, 'convertLanguageCodes').callsArgWith(2, 'error', null);

        request(app)
          .get('/api/1.0/languages/detect')
          .query(query)
          .end(function(err, res){
            expect(res.statusCode).to.eql(500);
            expect(res.body).to.eql({error: 'error'});
            done();
          });
      });
    });

  });

});
