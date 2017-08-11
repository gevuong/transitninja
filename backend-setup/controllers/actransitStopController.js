var actransitStationModel = require('../models/actransitStationModel');
var actransit = require('../stations/actransitStations');
console.log('-----', "1");
module.exports = function(app) {
  app.get('/api/actransitStations', function(req, res) {
    let actransitStationsArray = actransit.actransitStations();
    actransitStationModel.create(actransitStationsArray, function(err, results){
      if (err) {
        return console.log(err);
      }
      // console.log('-----1',results);
      res.send(results);
    });
  });
  // });
};
