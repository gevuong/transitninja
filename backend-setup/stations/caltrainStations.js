var caltrainStations = function(){
  var fs = require('fs');
  var initialData =[];

var x = fs.readFileSync(__dirname + '/caltrainStops.txt', 'utf8');
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
  dummy.push({'stop_id': op[0], 'stop_code': op[1], 'stop_name':op[2],'stop_desc': op[3],
  'stop_lat': op[4], 'stop_lon': op[5], 'zone_id': op[6], 'stop_url': op[7], 'location_type': op[8],
  'parent_station': op[9], 'platform_code': op[10], 'wheelchair_boarding': op[11] });
});
return dummy;
};

// console.log(caltrainStations());

module.exports.caltrainStations = caltrainStations;
