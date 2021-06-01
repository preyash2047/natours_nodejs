const express = require("express");

const router = express.Router();

const tourController = require('./../controllers/tourController');

//router.param('id', tourController.checkID);
//router.route('/').get(tourController.getTours).post(tourController.checkBody, tourController.createTours);

router.route('/top-5-cheap').get(tourController.aliesTopTours , tourController.getTours);
router.route('/tour-stats').get(tourController.getTourStats);


router.route('/').get(tourController.getTours).post(tourController.createTours);
router.route('/:id').get(tourController.getTour).patch(tourController.updateTours).delete(tourController.deleteTours);

module.exports = router;