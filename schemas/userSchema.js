const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
})

module.exports = mongoose.model("User", userSchema);