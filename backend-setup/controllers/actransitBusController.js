var actransitBussesModel = require('../models/actransitBussesModel');
var actransitBusses = require('../busses/actransitBusses');

module.exports = function(app) {
  app.get('/api/actransitBusses', function(req, res) {
    let actransitBussesArray = actransitBusses.actransitBusses();
    console.log(actransitBussesArray);
    actransitBussesModel.create(actransitBussesArray, function(err, results){
      if (err) {
        return console.log(err);
      }
      console.log('-----1',results);
      res.send(results);
    });
  });
  // });
};
