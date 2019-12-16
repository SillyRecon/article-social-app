var express = require('express');
var router = express.Router();


const passport = require('passport');
const User = require('../models/User');

router.get('/user/register', function(req, res) {
  //res.render('register', {});
  res.set('Content-Type', 'text/plain');
  res.status(200).send('Welcome to registration');
});

router.post('/user/register', function(req, res, next) {

 const user = new User({
   email: req.body.email,
   password: req.body.password
 });

 User.findOne({ email: req.body.email }, (err, existingUser) => {
   if (err) { return next(err); }
   if (existingUser) {
     //req.flash('errors', { msg: 'Account with that email address already exists.' });
     return res.redirect('/signup');
   }
   user.save((err) => {
     if (err) { return next(err); }
     req.logIn(user, (err) => {
       if (err) {
         return next(err);
       }
       res.redirect('/');
     });
   });
 });
});

router.get('/user/login', function(req, res) {
  //res.render('login', {user: req.user, message: req.flash('error')});
  res.set('Content-Type', 'text/plain');
  res.status(200).send('Welcome to login');
});

router.post('/user/login', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      req.flash('errors', info);
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      //req.flash('success', { msg: 'Success! You are logged in.' });
      res.redirect(req.session.returnTo || '/');
    });
})(req, res, next);



});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


module.exports = router;
