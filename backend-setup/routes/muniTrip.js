var muniRoutes = require('./muniRoute');

var muniTrip = function(){
  var fs = require('fs');
  var initialData =[];

  var x = fs.readFileSync(__dirname+'/muniTrips.txt', 'utf8');
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
  dummy.push({'block_id': op[0], 'route_id': op[1], 'direction_id':op[2],
  'trip_headsign': op[3], 'shape_id': op[4], 'service_id': op[5], 'trip_id': op[6]});
});
  return dummy;
};

var info = function (){
  var arrs = {};
  let muniInfo = muniRoutes.muniRoutes();
  let tripping = muniTrip();
  tripping.forEach(function(ops){
    muniInfo.forEach(function(op2){
      if(ops.route_id === op2.route_id){
        arrs[ops.trip_id] = Object.assign(ops, op2);
      }
    });
  });
  return arrs;
};


// console.log(info());

module.exports.muniTrip = muniTrip;
module.exports.info = info;


// console.log(muniTrip());
