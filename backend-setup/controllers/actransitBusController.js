let actransitBussesModel = require('../models/actransitBussesModel');
let express = require('express');
// let app = express();
let GtfsRealtimeBindings = require('gtfs-realtime-bindings');
let request = require('request');
let rp = require('request-promise');
let actransitBusModel = require('../models/actransitBussesModel');

let apiArr = ["7cec8694-c386-42b4-870c-a76aef58b40f",
"1e63a81e-0a10-4ef8-991c-ed195c33a855",
"b021f9d5-2fe8-4fd8-90f0-4b8b5807cf51"];

let ACToken = "5D2C095B639A09CFD40259AE5E570747";

const actransitBusController = function(app) {

    app.get('/api/actransitBusses', function(req, res) {
      actransitBusModel.remove().exec();

      rp({
        method: 'GET',
        url: `https://api.511.org/transit/vehiclepositions?api_key=${apiArr[Math.floor(Math.random()*apiArr.length)]}&agency=actransit`,
        encoding: null
      }).then(function(arr){

        let array = GtfsRealtimeBindings.FeedMessage.decode(arr).entity;
        console.log(array[0]);
        let actransitArr = [];
        array.forEach(function(entity) {
          actransitArr.push({
            'id': entity.id,
            'trip_id': entity.vehicle.trip.trip_id,
            'lon': entity.vehicle.position.longitude,
            'lat': entity.vehicle.position.latitude,
            'stop_id': entity.vehicle.stop_id
            });
        });

      actransitBussesModel.create(actransitArr, function(err, results){
        if (err) {
          return console.log(err);
        }
        res.send(actransitArr);
      });
    });
  });
};


module.exports = actransitBusController;
