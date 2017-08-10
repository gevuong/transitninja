var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var muniBussesSchema = new Schema({
  id: String,
  trip_id: String,
  lon: Number,
  lat: Number,
  stop_id: String
});

var muniBusses = mongoose.model('muniBusses', muniBussesSchema);

module.exports = muniBusses;
