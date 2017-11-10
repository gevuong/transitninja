// npm
let express = require('express');
let app = express(); // start express app
let mongoose = require('mongoose');

// directories
var actransitStationModel = require('../models/actransitStationModel');
var actransit = require('../stations/actransitStations');
let config = require('../config'); // requires folder

let port = process.env.PORT || 3000;

mongoose.connect(config.getDBConnectionString(), err => {
  if (err) return console.log(err);

  app.listen(port, function() {
    console.log('listening to 3000');
  });
});

let createACTransitStations = function() {
  actransitStationModel.remove().exec(); // clears collection in database
  let actransitStationsArray = actransit.actransitStations();

  actransitStationModel.create(actransitStationsArray, function(err, results){
    console.log('initiate actransitStations persistence...');
    if (err) {
      return console.log(err);
    }
    console.log('actransitStations persisted!');
  });
};

createACTransitStations();

module.exports.createACTransitStations = createACTransitStations;
