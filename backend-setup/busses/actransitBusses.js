
var actransitBusses = function(){
  var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
  var request = require('request');
  var actransitRequestSettings = {
    method: 'GET',
    url: 'https://api.511.org/transit/vehiclepositions?api_key=7cec8694-c386-42b4-870c-a76aef58b40f&agency=actransit',
    encoding: null
  };
  request(actransitRequestSettings, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var actransitArr = [];
      var feed = GtfsRealtimeBindings.FeedMessage.decode(body);
      feed.entity.forEach(function(entity) {
        actransitArr.push({
          'id': entity.id,
          'trip_id': entity.vehicle.trip.trip_id,
          'lon': entity.vehicle.position.longitude,
          'lat': entity.vehicle.position.latitude,
          'stop_id': entity.vehicle.stop_id
          });
      });
    }
    return actransitArr;
  });
};

module.exports.actransitBusses = actransitBusses;
