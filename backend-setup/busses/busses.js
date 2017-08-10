var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var request = require('request');

var MuniRequestSettings = {
  method: 'GET',
  url: 'https://api.511.org/transit/vehiclepositions?api_key=7cec8694-c386-42b4-870c-a76aef58b40f&agency=sf-muni',
  encoding: null
};
request(MuniRequestSettings, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var feed = GtfsRealtimeBindings.FeedMessage.decode(body);
    feed.entity.forEach(function(entity) {
      if (entity.trip_update) {
        console.log(entity.trip_update);
      }
    });
  }
  console.log(feed);
});

var actransitRequestSettings = {
  method: 'GET',
  url: 'https://api.511.org/transit/vehiclepositions?api_key=7cec8694-c386-42b4-870c-a76aef58b40f&agency=actransit',
  encoding: null
};
request(actransitRequestSettings, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var feed = GtfsRealtimeBindings.FeedMessage.decode(body);
    feed.entity.forEach(function(entity) {
      if (entity.trip_update) {
        console.log(entity.trip_update);
      }
    });
  }
  console.log(feed);
});
