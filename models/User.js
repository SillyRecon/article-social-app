var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({

});

var User = mongoose.model('users', UserSchema);

module.exports = User;
