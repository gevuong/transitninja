var muniStationModel = require('../models/muniStationModel');
var muni = require('../stations/muniStations');

module.exports = function(app) {
  app.get('/api/muniStations', function(req, res) {
    let muniStationsArray = muni.muniStations();
    muniStationModel.create(muniStationsArray, function(err, results){
      if (err) {
        return console.log(err);
      }
      res.send(results);
    });
  });
  // });
};
