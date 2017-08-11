var caltrainRoutes = function(){
  var fs = require('fs');
  var initialData =[];

  var x = fs.readFileSync(__dirname+'/caltrainRoutes.txt', 'utf8');
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
  dummy.push({'route_id': op[0], 'route_short_name': op[1], 'route_long_name':op[2],'route_desc': op[3],
  'route_type': op[4], 'route_url': op[5], 'route_color': op[6] });
  });
  return dummy;
};

module.exports.caltrainRoutes = caltrainRoutes;
