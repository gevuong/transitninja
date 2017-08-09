var muniStops = require('../stations/muniStations');

console.log(muniStops.x());


    // seed database
    var starterTodos = [
      {
        username: 'test',
        todo: 'buy milk',
        isDone: false,
        hasAttachment: false
      },
      {
        username: 'test',
        todo: 'feed dog',
        isDone: false,
        hasAttachment: false
      },
      {
        username: 'test',
        todo: 'learn node',
        isDone: false,
        hasAttachment: false
      }
    ];
    Todos.create(starterTodos, function(err, results) {
      res.send(results);
      // console.log(results);
    });
  });
};

