// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const Mongoose = require('mongoose');
var should = chai.should();
var db;


chai.use(chaiHttp);
var app = require('../server');

describe("Testing the Server", function() {
  //Testing access to the index page
  it('should get the root page on / GET', function(done) {
    chai.request(app)
      .get('/')
      .end(function(err, res){
        should.exist(res);
        res.should.have.status(200);
        done();
      });
  });

});
