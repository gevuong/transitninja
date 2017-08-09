var Todos = require('../models/todoModel');

module.exports = function(app) {
  app.get('/api/setupTodos', function(req, res) {

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
      console.log(results);
    });
  });
};
