
// modules
let express = require('express');
let app = express(); // start express app
let mongoose = require('mongoose');
let morgan = require('morgan') // displays on terminal when API endpoint is hit

// import directories
let router = require('./services/routes');
let config = require('./config'); // requires folder

// port setup, if in production, you'll have environment variable that says what port is, otherwise default to 3000
let port = process.env.PORT || 3000;

// let muniStopController = require('./controllers/muniStopController');
// let actransitBusController = require('./controllers/actransitBusController');
// let muniBusController = require('./controllers/muniBusController');
// let actransitStopController = require('./controllers/actransitStopController');
// let bartStopController = require('./controllers/bartStopController');
// let caltrainStopController = require('./controllers/caltrainStopController');

// setup public assets folder to build code for the browser, which will be delivered straight to the browser
// app.use([path], callback)
// mounts specified middleware function at specified path. Fcn is executed when base of requested path matches path.
// app.use('/assets', express.static(__dirname + '/public'));

// templating with the server side. EJS is a templating engine that transforms template into an HTML file sent to client, making it easier to design an HTML page on server side.
// app.set(name, value) => Assigns setting name to value.
// app.set('view engine', 'ejs');


mongoose.connect(config.getDBConnectionString(), (err) => {
  if (err) return console.log(err);

  app.listen(port, function() {
    // console.log('listening to 3000');
  });
});

app.use(morgan('combined'));
app.use('/v1', router);
