let actransitBussesModel = require('../models/actransitBussesModel');
let express = require('express');
// let app = express();
let GtfsRealtimeBindings = require('gtfs-realtime-bindings');
let request = require('request');
let rp = require('request-promise');
let actransitBusModel = require('../models/actransitBussesModel');

const actransitRequestSettings = {
  method: 'GET',
  url: 'https://api.511.org/transit/vehiclepositions?api_key=7cec8694-c386-42b4-870c-a76aef58b40f&agency=actransit',
  encoding: null
};

const actransitBusController = function(app) {
  rp(actransitRequestSettings).then(function(arr){
    app.get('/api/actransitBusses', function(req, res) {
      actransitBusModel.remove().exec();

      let array = GtfsRealtimeBindings.FeedMessage.decode(arr).entity;
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
