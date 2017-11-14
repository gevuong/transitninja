var muniStationModel = require('../models/muniStationModel');
var muni = require('../stations/muniStations');

// export function that will take the express app as an argument.
module.exports = function(app) {

  //HTTP get request: app.get adds an API endpoint, pass in a request and response. This is where you would seed data if necessary (via json-generator.com). All you need is an array of objects.
  app.get('/api/muniStations', function(req, res) {
    // clear the database.
    muniStationModel.remove().exec();

    let muniStationsArray = muni.muniStations();
    // model.create accepts an array
    muniStationModel.create(muniStationsArray, function(err, results){
      // error first callback
      if (err) {
        return console.log(err);
      }
      // HTTP response output results to the browser after data has been created as confirmation
      res.send(results);
    });
  });
  // });
};
