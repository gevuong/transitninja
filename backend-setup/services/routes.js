// let express = require('express');
// let app = express();
// let app = require('express')();

let router = require('express').Router();

// Controllers
const actransitBusController = require('../controllers/actransitBusController');
const actransitStopController = require('../controllers/actransitStopController');
const bartStopController = require('../controllers/bartStopController');
const caltrainStopController = require('../controllers/caltrainStopController');
const muniBusController = require('../controllers/muniBusController');
const muniStopController = require('../controllers/muniStopController');

// Routes
console.log('router starts here');
console.log('muniStopController', muniStopController);
router.get('/api/actransitBusses', actransitBusController);
router.get('/api/actransitStations', actransitStopController);
router.get('/api/bartStations', bartStopController);
router.get('/api/caltrainStations', caltrainStopController);
router.get('/api/muniStations', muniStopController.receiveMuniStations);
router.get('/api/muniBusses', muniBusController);

module.exports = router;
