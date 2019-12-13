"use strict";// NPM install mongoose and chai. Make sure mocha is globally
// installed
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chai = require('chai');
const expect = chai.expect;// Create a new schema that accepts a 'name' object.
// 'name' is a required field
const testSchema = new Schema({
  name: { type: String, required: true }
});
//Create a new collection called 'Name'
const Person = mongoose.model('name', testSchema);
describe('Database Tests', function() {
  //Before starting the test, create a sandboxed database connection
  //Once a connection is established invoke done()
  before(function (done) {
    mongoose.connect('mongodb://localhost/test');
    const database = mongoose.connection;
    database.on('error', console.error.bind(console, 'connection error'));
    database.once('open', function() {
      console.log('We are connected to test database!');
      done();
    });
  });
describe('Test Database', function() {
    //Save object with 'name' value of 'Alfred'
    it('New name saved to test database', function(done) {
      var test = Person({
        name: 'Alfred'
      });

      test.save(done);
    });
    it('Dont save incorrect format to database', function(done) {
      //Attempt to save with wrong info. An error should trigger
      var test = Person({
        notName: 'Not Alfred'
      });      test.save(err => {
        if(err) { return done(); }
        throw new Error('Should generate error!');
      });
    });
    it('Should retrieve data from test database', function(done) {
      //Look up the 'Alfred' object previously saved.
      Person.find({name: 'Alfred'}, (err, name) => {
        if(err) {throw err;}
        if(name.length === 0) {throw new Error('No data!');}
        done();
      });
    });
});  //After all tests are finished drop database and close connection
after(function(done){
  mongoose.connection.db.dropDatabase(function(){
    mongoose.connection.close(done);
    });
});

});
