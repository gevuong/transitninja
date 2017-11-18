// npm
let GtfsRealtimeBindings = require('gtfs-realtime-bindings');
let request = require('request');
let rp = require('request-promise');

// directories
let actransitBussesModel = require('../models/actransitBussesModel');
let info = require('../routes/actransitTrip');

let apiArr = ["7cec8694-c386-42b4-870c-a76aef58b40f",
"1e63a81e-0a10-4ef8-991c-ed195c33a855",
"b021f9d5-2fe8-4fd8-90f0-4b8b5807cf51"];

let actransitInfo = info.info();

const actransitBusController = function(req, res) {
  actransitBussesModel.remove().exec(); // clears collection from database

  // we use this request promise so that we FIRST get an array of all vehicle positions from the 511 API.
  // Only after the API has returned the list of vehicle positions, we create an array of POJOS for each bus, and then create models.
  rp({
    method: 'GET',
    url: `https://api.511.org/transit/vehiclepositions?api_key=${apiArr[Math.floor(Math.random()*apiArr.length)]}&agency=AC`,
    encoding: null
  }).then(function(arr){
    let array = GtfsRealtimeBindings.FeedMessage.decode(arr).entity;

    // console.log('array', array[1].vehicle.trip.);
    // res.send(array);
    console.log('actransitInfo: ', actransitInfo[array[0].vehicle.trip.trip_id]);

    let actransitArr = [];
    array.forEach(function(entity) {
      if (actransitInfo[entity.vehicle.trip.trip_id]) {
        console.log('-------------------------------');
      actransitArr.push({
        'id': entity.id,
        'trip_id': entity.vehicle.trip.trip_id,
        'lon': entity.vehicle.position.longitude,
        'lat': entity.vehicle.position.latitude,
        'stop_id': entity.vehicle.stop_id,
        'trip_headsign': actransitInfo[entity.vehicle.trip.trip_id].trip_headsign,
        "route_short_name": actransitInfo[entity.vehicle.trip.trip_id].route_short_name,
        "route_long_name": actransitInfo[entity.vehicle.trip.trip_id].route_long_name

        });
      }
    });

    console.log('actransitArr', actransitArr);
    // MongoDB will see schema for the first time, set it up, and then add data to DB via Mongoose .create method.
    actransitBussesModel.create(actransitArr, function(err, results){
      console.log('initiate actransitBusses persistence...');
      if (err) {
        return console.log(err);
      }
      console.log('actransitBusses persisted!');
      res.send(actransitArr);

    });
  });
};


module.exports = actransitBusController;
