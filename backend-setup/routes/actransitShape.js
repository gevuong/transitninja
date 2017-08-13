var actransitShape = function(){
  var fs = require('fs');
  var initialData =[];

  var x = fs.readFileSync(__dirname+'/actransitShapes.txt', 'utf8');
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
  dummy.push({'shape_id': op[0], 'shape_pt_lat': op[1], 'shape_pt_lon':op[2],'shape_pt_sequence': op[3]});
  });
  return dummy;
};


module.exports.actransitShape = actransitShape;

// console.log(actransitShape());
