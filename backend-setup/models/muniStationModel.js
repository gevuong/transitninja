let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let muniStationSchema = new Schema({
  stop_id: Number,
  stop_name: String,
  stop_desc: Number,
  stop_lat: Number,
  stop_lon: Number,
  zone_id: Number,
  stop_url: String
});

// to create a new model using Schema, which provides methods to find, findById, findByIdAndUpdate, findByIdAndRemove, create, update, delete, records inside MongoDB.

let muniStations = mongoose.model('muniStationsTest4', muniStationSchema);

module.exports = muniStations;
