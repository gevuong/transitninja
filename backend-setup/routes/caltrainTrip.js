var caltrainRoutes = require('./caltrainRoute');

var caltrainTrip = function(){
  var fs = require('fs');
  var initialData =[];

  var x = fs.readFileSync(__dirname+'/caltrainTrips.txt', 'utf8');
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
  dummy.push({'route_id': op[0], 'service_id': op[1], 'trip_id':op[2],
  'trip_headsign': op[3], 'trip_short_name': op[4], 'direction_id': op[5], 'block_id': op[6], 'shape_id': op[7], 'wheelchair_accessible': op[8], 'bikes_allowed': op[9]});
  });
  return dummy;
};


var info = function (){
  var arrs = [];
  let caltrainInfo = caltrainRoutes.caltrainRoutes();
  let tripping = caltrainTrip();
  tripping.forEach(function(ops){
    caltrainInfo.forEach(function(op2){
      if(ops.route_id === op2.route_id){
        arrs.push(Object.assign(ops, op2));
      }
    });
  });
  return arrs;
};

// console.log(info());

module.exports.caltrainTrip = caltrainTrip;
module.exports.info = info;

// console.log(caltrainTrip());
