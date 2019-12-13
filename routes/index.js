var express = require('express');
var router = express.Router();



router.get('/', function (req, res) {
  res.set('Content-Type', 'text/plain');
  res.status(200).send('Welcome to pop-app');
});



module.exports = router;
