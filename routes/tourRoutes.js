const express = require("express");
const router = express.Router();

const tourController = require('../controllers/tourController');

router.param('id', tourController.checkID);

router.route('/').get(tourController.getTours).post(tourController.checkBody, tourController.createTours);
router.route('/:id').get(tourController.getTour).patch(tourController.updateTours).delete(tourController.deleteTours);

module.exports = router;