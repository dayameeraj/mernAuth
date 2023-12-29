// controllers/userController.js

const Song = require("../schemas/songSchema");
const fileUpload = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

function addSong(req, res) {
  const { songname } = req.body;
  const song = req?.files?.song;

  if (song && song.mimetype === "audio/mpeg") {
    fileUpload.Upload(song.tempFilePath, "video").then(({ result, error }) => {
      if (result) {
        // Handle successful result
        const newSong = new Song({
          songname,
          url: result.secure_url,
        });
        newSong.save();
        res
          .status(200)
          .json({ success: "added song successfully!", res: result });
      } else {
        res
          .status(500)
          .json({ error: error.message, errorCode: error.http_code });
      }
    });
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
