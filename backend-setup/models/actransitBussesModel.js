var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var actransitBussesSchema = new Schema({
  id: String,
  trip_id: String,
  lon: Number,
  lat: Number,
  stop_id: String
});

// console.log('actransitBussesSchema', actransitBussesSchema);
var actransitBusses = mongoose.model('actransitBussesTest', actransitBussesSchema);

module.exports = actransitBusses;
