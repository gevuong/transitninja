var muniRoutes = function(){
  var fs = require('fs');
  var initialData =[];

  var x = fs.readFileSync(__dirname+'/muniRoutes.txt', 'utf8');
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
  dummy.push({'route_long_name': op[0], 'route_type': op[1], 'route_text_color':op[2],'route_color': op[3],
  'agency_id': op[4], 'route_id': op[5], 'route_url': op[6], 'route_desc': op[7], 'route_short_name': op[8]});
  });
  return dummy;
};


module.exports.muniRoutes = muniRoutes;
