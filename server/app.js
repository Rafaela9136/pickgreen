// dependencies
var express         = require('express');
var logger          = require('morgan');
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');
var hash            = require('bcrypt-nodejs');
var path            = require('path');
/*var passport        = require('passport');
var localStrategy   = require('passport-local').Strategy;*/

// mongoose
mongoose.connect('mongodb://localhost/pickgreen-mongo');

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// user schema/model
var User = require('./models/user.js');

// create instance of express
var app = express();

// require routes
var userRoutes 		= require('./routes/user.js');
var localRoutes		= require('./routes/local.js');
var materialRoutes	= require('./routes/material.js');
var coletorRoutes	= require('./routes/coletor.js');
var admRoutes		= require('./routes/administrador.js');
var eventoRoutes	= require('./routes/evento.js');
var depositoRoutes	= require('./routes/deposito.js');
//var routes = require('./routes/api.js');

// define middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/*app.use(passport.initialize());
app.use(passport.session());*/

// configure passport
/*passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());*/

app.get('/', function(req, res) {
  res.send('Express server listening on port 3000');
});
// routes
app.use('/userApi', userRoutes);
app.use('/localApi', localRoutes);
app.use('/materialApi', materialRoutes);
app.use('/coletorApi', coletorRoutes);
app.use('/admApi', admRoutes);
app.use('/eventoApi', eventoRoutes);
app.use('/depositoApi', depositoRoutes);
//app.use('/', routes);

// error hndlers
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }));
});

module.exports = app;