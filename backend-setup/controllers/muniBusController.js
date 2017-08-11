let muniBussesModel = require('../models/muniBussesModel');
let express = require('express');
// let app = express();
let GtfsRealtimeBindings = require('gtfs-realtime-bindings');
let request = require('request');
let rp = require('request-promise');
let muniBusModel = require('../models/muniBussesModel');

const muniRequestSettings = {
  method: 'GET',
  url: 'https://api.511.org/transit/vehiclepositions?api_key=7cec8694-c386-42b4-870c-a76aef58b40f&agency=sf-muni',
  encoding: null
};

const muniBusController = function(app) {
  rp(muniRequestSettings).then(function(arr){
    app.get('/api/muniBusses', function(req, res) {
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
        console.log('-----1',results);
        res.send(muniArr);
      });
    });
  });
};

module.exports = muniBusController;
