// npm
let express = require('express');
let app = express(); // start express app
let mongoose = require('mongoose');

// directories
var bartStationModel = require('../models/bartStationModel');
var bart = require('../stations/bartStations');
let config = require('../config'); // requires folder

let port = process.env.PORT || 3000;

mongoose.connect(config.getDBConnectionString(), err => {
  if (err) return console.log(err);

  app.listen(port, function() {
    console.log('listening to 3000');
  });
});

let createBartStations = function() {
  bartStationModel.remove().exec(); // clears collection in database
  let bartStationsArray = bart.bartStations();

  bartStationModel.create(bartStationsArray, function(err, results){
    console.log('initiate bartStations persistence...');
    if (err) {
      return console.log(err);
    }
    console.log('bartStations persisted!');
  });
};

createBartStations();

module.exports.createBartStations = createBartStations;
