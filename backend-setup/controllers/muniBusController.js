// npm
let GtfsRealtimeBindings = require('gtfs-realtime-bindings');
let request = require('request');
let rp = require('request-promise');

// directories
let muniBussesModel = require('../models/muniBussesModel');
let info = require('../routes/muniTrip');

let apiArr = ["3b31e671-cca3-4abf-9510-2ccf0996ef28",
"69ca5ef3-1acd-476d-93bc-7173838f5c79",
"299a8fd5-2137-4546-b9ee-d09da9d31535"];

let muniInfo = info.info();

const muniBusController = function(req, res) {
  muniBussesModel.remove().exec(); // clears collection from database

  // we use this request promise so that we FIRST get an array of all vehicle positions from the 511 API.
  // Only after the API has returned the list of vehicle positions, we create an array of POJOS for each bus, and then create models.
  rp({
    method: 'GET',
    url: `https://api.511.org/transit/vehiclepositions?api_key=${apiArr[Math.floor(Math.random()*apiArr.length)]}&agency=SF`,
    encoding: null
  }).then(function(arr){
    let array = GtfsRealtimeBindings.FeedMessage.decode(arr).entity;

    console.log('muniInfo: ', muniInfo);
    // res.send(muniInfo);
    let muniArr = [];
    array.forEach(function(entity) {
      if (muniInfo[entity.vehicle.trip.trip_id]) {
        muniArr.push({
          'id': entity.id,
          'trip_id': entity.vehicle.trip.trip_id,
          'lon': entity.vehicle.position.longitude,
          'lat': entity.vehicle.position.latitude,
          'stop_id': entity.vehicle.stop_id,
          'trip_headsign': muniInfo[entity.vehicle.trip.trip_id].trip_headsign,
          "route_short_name": muniInfo[entity.vehicle.trip.trip_id].route_short_name,
          "route_long_name": muniInfo[entity.vehicle.trip.trip_id].route_long_name

        });
      }
    });
    console.log('muniArr: ', muniArr);
    muniBussesModel.create(muniArr, function(err, results){
      console.log('initiate muniBusses persistence...');
      if (err) {
        return console.log(err);
      }
      console.log('muniBusses persisted!');
      res.send(muniArr);
    });
  });
};

module.exports = muniBusController;
