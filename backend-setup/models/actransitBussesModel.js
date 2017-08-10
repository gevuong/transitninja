var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var actransitBussesSchema = new Schema({
  id: String,
  trip_id: String,
  lon: Number,
  lat: Number,
  stop_id: String
});

var actransitBusses = mongoose.model('actransitBusses', actransitBussesSchema);

module.exports = actransitBusses;
