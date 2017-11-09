
let router = require('express').Router();

// Controllers
const actransitBusController = require('../controllers/actransitBusController');
const actransitStopController = require('../controllers/actransitStopController');
const bartStopController = require('../controllers/bartStopController');
const caltrainStopController = require('../controllers/caltrainStopController');
const muniBusController = require('../controllers/muniBusController');
const muniStopController = require('../controllers/muniStopController');

// Routes
router.get('/api/actransitBusses', actransitBusController);
router.get('/api/actransitStations', actransitStopController);
router.get('/api/bartStations', barStopController);
router.get('/api/caltrainStations', caltrainStopController);
router.get('/api/muniStations', muniStationsController);
router.get('/api/muniBusses', muniBusController);

module.exports = router;
