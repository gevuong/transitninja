let express = require('express');
let app = express(); // start express app
let mongoose = require('mongoose');
let config = require('./config'); // requires folder
let router = require('express').Router();
let bodyParser = require('body-parser');
let morgan = require('morgan')
let router = require('./services/router');

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

mongoose.connect(config.getDBConnectionString(), (err, database) => {
  if (err) return console.log(err);

  app.listen(port, function() {
    // console.log('listening to 3000');
  });
});

// following function adds API endpoint to Express app. Run Node server (nodemon app.js) and express will setup everything, run API endpoint which should then connect to Mongoose. MongoDB will see schema for the first time, set it up, and then add data to DB via Mongoose .create method.

// to prevent from running again, can put some checks to see if there's a bunch of records in there, if it's not empty, that lets you do this only on dev, never on prod.

// Routes

// router.get
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use('/v1', router);

//
// actransitBusController(app);
// muniBusController(app);
//
// actransitStopController(app);
//
// bartStopController(app);
// caltrainStopController(app);
//
// muniStopController(app);
