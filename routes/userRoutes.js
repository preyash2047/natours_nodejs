const express = require("express");

const userController = require('../controllers/userController');

const router = express.Router();

router.route('/').get(userController.getUsers).post(userController.createUsers);
router.route('/:id').get(userController.getUser).patch(userController.updateUsers).delete(userController.deleteUsers);

module.exports = router;