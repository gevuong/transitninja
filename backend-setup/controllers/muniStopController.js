var muniStationModel = require('../models/muniStationModel');
var d = require('../stations/muniStations');

// console.log(d.muniStations());

module.exports = function(app) {
  app.get('/api/muniStations', function(req, res) {


    let muniStationsArray = d.muniStations();
    // console.log(muniStationsArray);
    // muniStationsArray.forEach(function(station) {

      muniStationModel.create(muniStationsArray, function(results){
        // if (err) {
        //   return console.log(err);
        // }
        // console.log(results);
        res.send(results);
      });
    });
  // });
};
