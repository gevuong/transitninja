var muniBussesModel = require('../models/muniBussesModel');
var muniBusses = require('../busses/muniBusses');

module.exports = function(app) {
  app.get('/api/muniBusses', function(req, res) {
    let muniBussesArray = muniBusses.muniBusses();
    console.log(muniBussesArray);
    muniBussesModel.create(muniBussesArray, function(err, results){
      if (err) {
        return console.log(err);
      }
      console.log('-----1',results);
      res.send(results);
    });
  });
  // });
};
