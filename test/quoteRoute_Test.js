'use strict';

var superagent = require('superagent');
var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();
var app = require('../server').app;

describe('Meetings JSON api', function() {
  this.timeout(5000);

  it('can get a collection of agenda items for a meeting', function(done) {
    superagent.get('http://localhost:3001/getQuotes/')
        .end(function(e, res) {
          console.log(res.body);
          expect(e).to.eql(null);
          expect(res.body.length).to.be.above(0);
         done();
    });
  });
});
