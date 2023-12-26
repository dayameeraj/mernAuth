const router = require("express").Router();

const userController = require("../controllers/userController");
const songController = require("../controllers/songController");
router.post("/register", userController.registerUser);
router.post("/songs", songController.addSong);
module.exports = router;
