var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var setupController = require('./controllers/setupController');
var db;
var port = process.env.PORT || 3000;

var muniStopController = require('./controllers/muniStopController');
var actransitBusController = require('./controllers/actransitBusController');
var muniBusController = require('./controllers/muniBusController');
var actransitStopController = require('./controllers/actransitStopController');
var bartStopController = require('./controllers/bartStopController');
var caltrainStopController = require('./controllers/caltrainStopController');

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

mongoose.connect(config.getDBConnectionString(), (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(port, function() {
    console.log('listening to 3000');
  });
});

setInterval(function(){
  actransitBusController(app);
  muniBusController(app);
}, 20000);


setupController(app); // setupController is a function
actransitStopController(app);

bartStopController(app);
caltrainStopController(app);

muniStopController(app);
