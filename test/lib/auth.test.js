var nock = require('nock'),
    config = require('../../config/config'),
    setup = require('../setup'),
    request = require('request'),
    Auth = require('../../lib/auth');

describe('Auth', function(){
  var AUTH_RESPONSE = {
        provider: 'firma8',
        uid: '1234',
        info: {
          name: 'jon',
          email: 'jon@firma8.com'
        },
        extra: {
          token: '5678',
          customers: [
            {
              id: '3942',
              name: 'firma8',
              roles: [
                'member',
                'admin'
              ],
              languages: [
                'en',
                'es',
                'de'
              ]
            }
          ]
        }
      };

  describe('.convertLanguageCodes', function() {

    describe('when codes not found', function() {
      it('it should return languages hash with language code for name', function(done){
        Auth.convertLanguageCodes(['fr'], [{code: 'en', name: 'English', direction: 'ltr'}, {code: 'es', name: 'Spanish', direction: 'ltr'}], function(err, languages) {
          expect(languages).to.eql([{code: 'fr', name: 'fr', direction: 'ltr'}]);
          done();
        });
      });
    });

    describe('when codes found', function() {
      it('it should return languages hash', function(done){
        Auth.convertLanguageCodes(['en'], [{code: 'en', name: 'English', direction: 'ltr'}, {code: 'es', name: 'Spanish', direction: 'ltr'}], function(err, languages) {
          expect(languages).to.eql([{code: 'en', name: 'English', direction: 'ltr'}]);
          done();
        });
      });
    });
  });

  describe('.findLanguageByCode', function() {

    describe('when code is found', function() {
      it('it should return language hash', function(done){
        Auth.findLanguageByCode('en', [{code: 'en', name: 'English', direction: 'ltr'}, {code: 'es', name: 'Spanish', direction: 'ltr'}], function(err, language) {
          expect(language).to.eql({code: 'en', name: 'English', direction: 'ltr'});
          done();
        });
      });
    });

    describe('when code not is found', function() {
      it('it should return empty hash', function(done){
        Auth.findLanguageByCode(['fr'], [{code: 'en', name: 'English', direction: 'ltr'}, {code: 'es', name: 'Spanish', direction: 'ltr'}], function(err, language) {
          expect(language).to.eql({});
          done();
        });
      });
    });

  });

  describe('.findCustomer', function() {

    describe('when customer found', function() {
      it('it should return customer hash', function(done){
        Auth.findCustomer('firma8', AUTH_RESPONSE, function(err, customer) {
          expect(customer).to.eql(AUTH_RESPONSE.extra.customers[0]);
          done();
        });
      });
    });

    describe('when customer not found', function() {
      it('it should return null', function(done){
        Auth.findCustomer('fake', AUTH_RESPONSE, function(err, customer) {
          expect(customer).to.eql(null);
          done();
        });
      });
    });

  });

  describe('.findLanguagesByCustomer', function() {

    describe('when customer exists and languages found', function() {
      it('it should return languages array', function(done){
        Auth.findLanguagesByCustomer('firma8', AUTH_RESPONSE, function(err, languages) {
          expect(languages).to.eql(AUTH_RESPONSE.extra.customers[0].languages);
          done();
        });
      });
    });

  });
});
