// controllers/userController.js

const Song = require("../schemas/songSchema");

async function addSong(req, res) {
  const { songname, url } = req.body;

  try {
    const newSong = new Song({
      songname,
      url,
    });

    await newSong.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { addSong };
