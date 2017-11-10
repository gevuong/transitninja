// Express router
let router = require('express').Router();

// Controllers
const actransitBusController = require('../controllers/actransitBusController');
const muniBusController = require('../controllers/muniBusController');
// const muniStopController = require('../controllers/muniStopController');

// Routes
console.log('router starts here');
// following function adds API endpoint to Express app. Run Node server (nodemon app.js) and express will setup everything, run API endpoint will connect to Mongoose.
router.get('/api/actransitBusses', actransitBusController);
router.get('/api/muniBusses', muniBusController);

// router.get('/api/muniStations', muniStopController.createMuniStations);

module.exports = router;
