let muniBussesModel = require('../models/muniBussesModel');
let express = require('express');
// let app = express();
let GtfsRealtimeBindings = require('gtfs-realtime-bindings');
let request = require('request');
let rp = require('request-promise');
let muniBusModel = require('../models/muniBussesModel');



let apiArr = ["3b31e671-cca3-4abf-9510-2ccf0996ef28",
"69ca5ef3-1acd-476d-93bc-7173838f5c79",
"299a8fd5-2137-4546-b9ee-d09da9d31535"];

let counter = 0;


let apiToken = () =>{
  if (counter === 2){
    counter = 0;
  } else {
    counter += 1;
  }
  return apiArr[counter];

};

const muniRequestSettings = {
  method: 'GET',
  url: `https://api.511.org/transit/vehiclepositions?api_key=${apiToken()}&agency=sf-muni`,
  encoding: null
};

const muniBusController = function(app) {
  rp(muniRequestSettings).then(function(arr){
    app.get('/api/muniBusses', function(req, res) {
      muniBusModel.remove().exec();

      let array = GtfsRealtimeBindings.FeedMessage.decode(arr).entity;
      let muniArr = [];
      array.forEach(function(entity) {
        muniArr.push({
          'id': entity.id,
          'trip_id': entity.vehicle.trip.trip_id,
          'lon': entity.vehicle.position.longitude,
          'lat': entity.vehicle.position.latitude,
          'stop_id': entity.vehicle.stop_id
          });
      });
      muniBussesModel.create(muniArr, function(err, results){
        if (err) {
          return console.log(err);
        }
        res.send(muniArr);
      });

    });
  });
};

module.exports = muniBusController;
