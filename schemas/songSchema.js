const mongoose = require("mongoose");
const songSchema = new mongoose.Schema({
  songname: {
    type: String,
    required: [true, "Your username is required"],
  },
  url: {
    type: String,
    required: [true, "Your password is required"],
  },
});

module.exports = mongoose.model("Songs", songSchema);
