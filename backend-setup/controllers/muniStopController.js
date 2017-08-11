var muniStationModel = require('../models/muniStationModel');
var muni = require('../stations/muniStations');
console.log('-----', "1");

module.exports = function(app) {
  app.get('/api/muniStations', function(req, res) {
    let muniStationsArray = muni.muniStations();
    console.log(muniStationsArray);
    muniStationModel.create(muniStationsArray, function(err, results){
      if (err) {
        return console.log(err);
      }
      console.log('-----1',results);
      res.send(results);
    });
  });
  // });
};
