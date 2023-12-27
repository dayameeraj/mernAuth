const router = require("express").Router();

const authController = require("../controllers/authController");

// auth routers
router.post("/signup", authController.signupPost);
router.post("/login", authController.loginPost);

module.exports = router;
