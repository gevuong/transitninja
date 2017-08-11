var actransitStationModel = require('../models/actransitStationModel');
var actransit = require('../stations/actransitStations');

module.exports = function(app) {
  app.get('/api/actransitStations', function(req, res) {
    actransitStationModel.remove().exec();

    let actransitStationsArray = actransit.actransitStations();
    actransitStationModel.create(actransitStationsArray, function(err, results){
      if (err) {
        return console.log(err);
      }

      res.send(results);
    });
  });
  // });
};
