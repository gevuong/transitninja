var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var muniBussesSchema = new Schema({
  id: String,
  trip_id: String,
  lon: Number,
  lat: Number,
  stop_id: String,
  trip_headsign: String,
  route_short_name: String,
  route_long_name: String
});

var muniBusses = mongoose.model('muniBussesTest', muniBussesSchema);

module.exports = muniBusses;
