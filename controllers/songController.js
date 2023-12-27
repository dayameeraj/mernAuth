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
    res.status(201).json({ message: "added song successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getSongs(req, res) {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { addSong, getSongs };
