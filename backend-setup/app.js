var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');

var port = process.env.PORT || 3000;

var muniStopController = require('./controllers/muniStopController');
var actransitBusController = require('./controllers/actransitBusController');
var muniBusController = require('./controllers/muniBusController');
var actransitStopController = require('./controllers/actransitStopController');
var bartStopController = require('./controllers/bartStopController');
var caltrainStopController = require('./controllers/caltrainStopController');

mongoose.connect(config.getDBConnectionString(), (err) => {
  if (err) return console.log(err);

  app.listen(port, function() {
    // console.log('listening to 3000');
  });
});

actransitBusController(app);
muniBusController(app);

actransitStopController(app);

bartStopController(app);
caltrainStopController(app);

muniStopController(app);
