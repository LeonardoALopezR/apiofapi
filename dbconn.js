'use strict';

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-plugin-autoinc');
mongoose.set('debug', true)
var connection = mongoose.connect('mongodb://localhost/api', function(err) {
  if (err)
    console.log('Unable to connect to database');

  console.log('Connection to databse succesful');
});

