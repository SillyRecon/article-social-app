const express  = require('express');
const passport = require('passport');
const mongoose = require('mongoose');//mongoose, a driver to connect to mongodb
const morgan = require('morgan'); // log requests to the console
const bodyParser = require('body-parser');// pull information from HTML POST
const methodOverride = require('method-override');// simulate DELETE and PUT
const chalk = require('chalk');
//const config = require('./config')();//access to config
var session = require('express-session');
var users = require('./routes/users');
var index = require('./routes/index');
var app = express();//create the app w/ express

// Connect to MongoDB
mongoose.connect('mongodb://henry:MaryScots@127.0.0.1:27017/rocket', {useNewUrlParser: true});
mongoose.connection.once('open', function(){
  console.log('Conection has been made!');
  }).on('error', function(error){
      console.log(error);
      console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
      process.exit();
      });
// configuration
app.set('host', process.env.BASE_IP || '127.0.0.1');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
// Where 1.0.0.0 is the IP address of your Proxy
app.set('trust proxy', process.env.BASE_IP);

app.use(express.static(__dirname + '/public'));//set the static files location /public/img will be /img for users
app.use(morgan('dev'));// log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));// parse application/x-www-form-urlencoded
app.use(bodyParser.json());// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use('/', index);
app.use('/users', users);

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});
module.exports = app;
