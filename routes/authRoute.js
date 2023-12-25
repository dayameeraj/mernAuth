
const router = require("express").Router();

const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);

module.exports = router;