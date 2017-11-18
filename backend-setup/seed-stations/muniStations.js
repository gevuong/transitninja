var muniStationModel = require('../models/muniStationModel');

let muniStations = function() {
  var fs = require('fs');
  var initialData = [];

  var x = fs.readFileSync(__dirname + '/muniStops.txt', 'utf8');

  var stringed = x.toString().split('\n');

  for(var i in stringed){
  initialData.push([stringed[i]]);
  }

  var dataToArray = [];

  initialData.pop();
  initialData.forEach(function(arr){

  var remove = arr.toString();
  remove = remove.replace(/(\r\n|\n|\r)/gm,"");
  return (dataToArray.push(remove.split(',')));
  });

  var dummy = [];

  dataToArray.forEach(function(op, idx){
  dummy.push({'stop_id': op[0], 'stop_name': op[1], 'stop_desc':op[2],'stop_lat': op[3],
  'stop_lon': op[4], 'zone_id': op[5], 'stop_url': op[6]});
  });

  return dummy;
};

module.exports.muniStations = muniStations;

// export function that will take the express app as an argument.
// let receiveMuniStations = function() {
//
//   //HTTP get request: app.get adds an API endpoint, pass in a request and response. This is where you would seed data if necessary (via json-generator.com). All you need is an array of objects.
//
//     // clears collection in database.
//     muniStationModel.remove().exec();
//
//     let muniStationsArray = muniStations();
//     console.log('muniStationsArray', muniStationsArray);
//
//     // model.create accepts an array
//     muniStationModel.create(muniStationsArray, function(err, results){
//       // error first callback
//       if (err) {
//         return console.log(err);
//       }
//       console.log('results:' , results);
//     });
// };
//
// receiveMuniStations();
