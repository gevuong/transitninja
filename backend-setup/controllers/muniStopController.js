// modules
let express = require('express');
let app = express(); // start express app
let mongoose = require('mongoose');

// directories
let config = require('../config'); // requires folder
var muniStationModel = require('../models/muniStationModel');
var muni = require('../stations/muniStations');

// port setup, if in production, you'll have environment variable that says what port is, otherwise default to 3000
let port = process.env.PORT || 3000;

mongoose.connect(config.getDBConnectionString(), err => {
  if (err) return console.log(err);

  app.listen(port, function() {
    console.log('listening to 3000');
  });
});

let createMuniStations = function() {
  muniStationModel.remove().exec(); // clears collection in database
  let muniStationsArray = muni.muniStations();

  // model.create accepts an array
  muniStationModel.create(muniStationsArray, (err, results) => {
    console.log('initiate muniStations persistence...');
    // error first callback
    if (err) {
      return console.log(err);
    }
    console.log("muniStations persisted!");
  });
};

// createMuniStations();

module.exports.createMuniStations = createMuniStations;
