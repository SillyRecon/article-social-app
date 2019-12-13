const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema();

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {

});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {

};


const User = mongoose.model('User', userSchema);

module.exports = User;
