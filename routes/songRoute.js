const songRouter = require("express").Router();

const songController = require("../controllers/songController");
const { requireAuth } = require("../middleware/authmiddleware");

// song routers
songRouter.post("/songs", requireAuth, songController.addSong);
songRouter.get("/getsongs", requireAuth, songController.getSongs);

module.exports = songRouter;
