let muniBussesModel = require('../models/muniBussesModel');
let express = require('express');
// let app = express();
let GtfsRealtimeBindings = require('gtfs-realtime-bindings');
let request = require('request');
let rp = require('request-promise');
let muniBusModel = require('../models/muniBussesModel');
let info = require('../routes/muniTrip');


let apiArr = ["3b31e671-cca3-4abf-9510-2ccf0996ef28",
"69ca5ef3-1acd-476d-93bc-7173838f5c79",
"299a8fd5-2137-4546-b9ee-d09da9d31535"];

let muniInfo = info.info();
console.log(muniInfo);

// let routeShortName = function(tripId) {
//   muniInfo.forEach(function(obj){
//     if (tripId === obj.tripId){
//       console.log(obj.route_short_name);
//       return obj.route_short_name;
//     }
//   });
// };
//
// let routeLongName = function(tripId) {
//   muniInfo.forEach(function(obj){
//     if (tripId === obj.tripId){
//       console.log(obj.route_long_name);
//       return obj.route_long_name;
//
//     }
//   });
// };


// let routeShortName = function() {
//    let promise = new Promise(function(resolve, reject){
//      resolve(muniInfo.forEach(function(obj){
//        if (entity.vehicle.trip.trip_id === obj.tripId){
//          console.log(obj.route_long_name);
//          return obj.route_long_name;
//        }
//      }));
//
//    });
//    return promise;
// };




// const muniRequestSettings = {
//   method: 'GET',
//   url: `https://api.511.org/transit/vehiclepositions?api_key=${apiArr[Math.floor(Math.random()*apiArr.length)]}&agency=sf-muni`,
//   encoding: null
// };

const muniBusController = function(app) {


    app.get('/api/muniBusses', function(req, res) {
      muniBusModel.remove().exec();



      rp({
        method: 'GET',
        url: `https://api.511.org/transit/vehiclepositions?api_key=${apiArr[Math.floor(Math.random()*apiArr.length)]}&agency=sf-muni`,
        encoding: null
      }).then(function(arr){

        let array = GtfsRealtimeBindings.FeedMessage.decode(arr).entity;
        let muniArr = [];
        array.forEach(function(entity) {
          console.log((muniInfo[entity.vehicle.trip.trip_id]).route_long_name);
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
        });

      muniBussesModel.create(muniArr, function(err, results){
        if (err) {
          return console.log(err);
        }
        console.log(muniArr);
        res.send(muniArr);
      });
    });
  });
};

module.exports = muniBusController;
