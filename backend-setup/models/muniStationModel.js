var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var muniStationSchema = new Schema({
  stop_id: Number,
  stop_name: String,
  stop_desc: Number,
  stop_lat: Number,
  stop_lon: Number,
  zone_id: Number,
  stop_url: String
});

var muniStations = mongoose.model('muniStations', muniStationSchema);

module.exports = muniStations;
