// npm
let express = require('express');
let app = express(); // start express app
let mongoose = require('mongoose');

// directories
var caltrainStationModel = require('../models/caltrainStationModel');
var caltrain = require('../stations/caltrainStations');
let config = require('../config'); // requires folder

let port = process.env.PORT || 3000;

mongoose.connect(config.getDBConnectionString(), err => {
  if (err) return console.log(err);

  app.listen(port, function() {
    console.log('listening to 3000');
  });
});

let createCaltrainStations = function() {
  caltrainStationModel.remove().exec(); // clears collection in database
  let caltrainStationsArray = caltrain.caltrainStations();

  caltrainStationModel.create(caltrainStationsArray, function(err, results){
    console.log('initiate caltrainStations persistence...');
    if (err) {
      return console.log(err);
    }
    console.log('caltrainStations persisted!');
  });
};
//
createCaltrainStations();

module.exports.createCaltrainStations = createCaltrainStations;
