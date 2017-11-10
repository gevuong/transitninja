// Note: running this file does not create all necessary documents in respective collection. You need to run each controller file separately in CLI (i.e. node controllers/bartStopController.js) to successfully create all documents in collection...haven't figured out why...

// modules
// let express = require('express');
// let app = express(); // start express app
// let mongoose = require('mongoose');

// directories
let config = require('../config'); // requires folder
let muniStations = require('../controllers/muniStopController');
let bartStations = require('../controllers/bartStopController');
let caltrainStations = require('../controllers/caltrainStopController');
let actransitStations = require('../controllers/actransitStopController');

// // port setup, if in production, you'll have environment variable that says what port is, otherwise default to 3000
// let port = process.env.PORT || 3000;
//
// mongoose.connect(config.getDBConnectionString(), err => {
//   if (err) return console.log(err);
//
//   var server = app.listen(port, function() {
//     console.log('listening to 3000 in services/seed.js');
//   });
// });
//
// // console.log(createMuniStations); // returns an object with value as fcn
// muniStations.createMuniStations();
// caltrainStations.createCaltrainStations();
// bartStations.createBartStations();
// actransitStations.createACTransitStations();
