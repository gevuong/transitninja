var bartStations = function(){
  var fs = require('fs');
  var initialData =[];

var x = fs.readFileSync(__dirname + '/bartStops.txt', 'utf8');
var stringed = x.toString().split('\n');
for(var i in stringed){
  stringed[i] = stringed[i].replace(/['"]+/g, '');

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
  'stop_lon': op[4], 'zone_id': op[5], 'stop_url': op[6], 'location_type': op[7], 'parent_station': op[8],
  'stop_timezone': op[9], 'wheelchair_boarding': op[10] });
});
return dummy;
};

// console.log(bartStations());

module.exports.bartStations = bartStations;
