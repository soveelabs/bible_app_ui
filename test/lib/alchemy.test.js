var nock = require('nock'),
    config = require('../../config/config'),
    setup = require('../setup'),
    request = require('request'),
    Alchemy = require('../../lib/alchemy');

describe('alchemy', function(){

  describe('text', function() {

    describe('when call succeeds', function() {
      it('it should return alchemy response', function(done){
        nock(config.alchemy_host)
          .filteringPath(function(path){
            return '/';
          })
          .get("/")
          .reply(200, 'si');

        Alchemy.translate.text('yes', 'en', 'es', 'firma8', '1234', function(err, res){
          expect(err).to.eql(null);
          expect(res.body).to.eql('si');
          done();
        });
      });
    });

    describe('when call fails', function() {
      it('it should return error', function(done){
        setup.sandbox.stub(request, 'get').callsArgWith(1, 'error', null, null);

        Alchemy.translate.text('yes', 'en', 'es', 'firma8', '1234', function(err, res){
          expect(err).to.eql('error');
          expect(res).to.eql(null);
          done();
        });
      });
    });

  });

  describe('htmlFragment', function() {

    describe('when call succeeds', function() {
      it('it should return alchemy response', function(done){
        nock(config.alchemy_host)
          .filteringPath(function(path){
            return '/';
          })
          .get("/")
          .reply(200, '<p>si</p>');

        Alchemy.translate.htmlFragment('<p>yes</p>', 'en', 'es', 'firma8', '1234', function(err, res){
          expect(err).to.eql(null);
          expect(res.body).to.eql('<p>si</p>');
          done();
        });
      });
    });

    describe('when call fails', function() {
      it('it should return error', function(done){
        setup.sandbox.stub(request, 'get').callsArgWith(1, 'error', null, null);

        Alchemy.translate.htmlFragment('<p>yes</p>', 'en', 'es', 'firma8', '1234', function(err, res){
          expect(err).to.eql('error');
          expect(res).to.eql(null);
          done();
        });
      });
    });

  });
});
