var caltrainStationModel = require('../models/caltrainStationModel');
var caltrain = require('../stations/caltrainStations');
// console.log('-----', "1");
module.exports = function(app) {
  app.get('/api/caltrainStations', function(req, res) {
    let caltrainStationsArray = caltrain.caltrainStations();

    caltrainStationModel.create(caltrainStationsArray, function(err, results){
      if (err) {
        return console.log(err);
      }
      // console.log('-----1',results);
      res.send(results);
    });
  });
  // });
};
