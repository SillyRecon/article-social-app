const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
var app = require('../server');

describe("Testing GET user login/register page", function() {
  //Testing access to the login page
  it('should get the user login page on /user/login GET', function(done) {
    chai.request(app)
      .get('/user/login')
      .end(function(err, res){
        should.exist(res);
        res.should.have.status(200);
        done();
      });
  });
  //Testing access to the register page
  it('should get the user login page on /user/register GET', function(done) {
    chai.request(app)
      .get('/user/register')
      .end(function(err, res){
        should.exist(res);
        res.should.have.status(200);
        done();
      });
  });

});

describe("Testing POST user login/register page", function() {
  //Testing post to the login page
  it('should post to the user login page on /user/login POST', function(done) {
    chai.request(app)
     .post('/auth/register')
     .send({
        username: 'louis',
        password: 'paris'
      })
     .end((err, res) => {
       should.exist(res);
       res.redirects[0].should.contain('/');
       done();
     });
  });
  //Testing post to the register page
  it('should post to the user login page on /user/register POST', function(done) {
    chai.request(app)
      .post('/auth/register')
      .send({
        username: 'louis',
        password: 'paris'
      })
    .end((err, res) => {
      should.exist(res);
      res.redirects[0].should.contain('/');
      done();
    });
  });

});
