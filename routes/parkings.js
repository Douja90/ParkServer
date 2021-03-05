const express =require('express');
const router = express.Router();
const { getParkings, addParking } = require('../controllers/parkings');

router.route('/').get(getParkings).post(addParking);

module.exports =router;