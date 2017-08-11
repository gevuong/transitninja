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
let muniCounter = 0;

let muniApiToken = () =>{
  let apiArr = ["3b31e671-cca3-4abf-9510-2ccf0996ef28",
  "69ca5ef3-1acd-476d-93bc-7173838f5c79",
  "299a8fd5-2137-4546-b9ee-d09da9d31535"];


  if (muniCounter === 2){
    muniCounter = 0;
  } else {
    muniCounter += 1;
  }
  return {
    method: 'GET',
    url: `https://api.511.org/transit/vehiclepositions?api_key=${apiArr[muniCounter]}&agency=sf-muni`,
    encoding: null
  };

};

let actransitCounter = 0;
let actransitApiToken = () =>{
  let apiArr = ["7cec8694-c386-42b4-870c-a76aef58b40f",
  "1e63a81e-0a10-4ef8-991c-ed195c33a855",
  "b021f9d5-2fe8-4fd8-90f0-4b8b5807cf51"];
  if (actransitCounter === 2){
    actransitCounter = 0;
  } else {
    actransitCounter += 1;
  }
  return {
    method: 'GET',
    url: `https://api.511.org/transit/vehiclepositions?api_key=${apiArr[actransitCounter]}&agency=actransit`,
    encoding: null
  };

};

setInterval(function(){
  actransitBusController(app, muniApiToken());
  muniBusController(app, actransitApiToken());
}, 20000);



setupController(app); // setupController is a function
actransitStopController(app);

bartStopController(app);
caltrainStopController(app);

muniStopController(app);
