var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var caltrainStationSchema = new Schema({
  stop_id: Number,
  stop_code: Number,
  stop_name: String,
  stop_desc: Number,
  stop_lat: Number,
  stop_lon: Number,
  zone_id: Number,
  stop_url: String,
  location_type: String,
  parent_station: String,
  platform_code: String,
  wheelchair_boarding: Number
});

var caltrainStations = mongoose.model('caltrainStationsTest4', caltrainStationSchema);

module.exports = caltrainStations;
