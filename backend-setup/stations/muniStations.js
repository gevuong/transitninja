
var muniStations = function(){
  var fs = require('fs');
  var initialData =[];

fs.readFile('muniStops.txt', function(err, data) {
    if(err) throw err;
    var array = data.toString().split("\n");
    for(var i in array) {
        initialData.push([array[i]]);
    }

var dataToArray = [];
  initialData.pop();

    initialData.forEach(function(arr){
      var stringg = arr.toString();
      stringg = stringg.replace(/(\r\n|\n|\r)/gm,"");
      return (
      dataToArray.push(stringg.split(','))
    );
    });
  var dummy = [];
    dataToArray.forEach(function(op, idx){
      dummy.push({'stop_id': op[0], 'stop_name': op[1], 'stop_desc':op[2],'stop_lat': op[3],
      'stop_lon': op[4], 'zone_id': op[5], 'stop_url': op[6]});
    });



    console.log(dummy);
});
};

console.log(muniStations());
