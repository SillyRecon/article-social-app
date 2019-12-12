var express  = require('express');
var app = express();//create the app w/ express
var mongoose = require('mongoose');//mongoose, a driver to connect to mongodb
var morgan = require('morgan'); // log requests to the console
var bodyParser = require('body-parser');// pull information from HTML POST
var methodOverride = require('method-override');// simulate DELETE and PUT
var config = require('./config')();//access to config
// configuration
// Where 1.0.0.0 is the IP address of your Proxy
app.set('trust proxy', '127.0.0.1');

app.use(express.static(__dirname + '/public'));//set the static files location /public/img will be /img for users
app.use(morgan('dev'));// log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));// parse application/x-www-form-urlencoded
app.use(bodyParser.json());// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// listen (start app with node server.js)
app.listen(config.port);
console.log('Express server listening on port ' + config.port);
