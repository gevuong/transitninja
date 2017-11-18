var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var actransitStationSchema = new Schema({
  stop_id: String,
  stop_code: Number,
  stop_name: String,
  stop_desc: Number,
  stop_lat: Number,
  stop_lon: Number,
  zone_id: Number,
  stop_url: String
});

// stop_id,stop_code,stop_name,stop_desc,stop_lat,stop_lon,zone_id,stop_url,location_type,parent_station


var actransitStations = mongoose.model('actransitStationsTest4', actransitStationSchema);

module.exports = actransitStations;
