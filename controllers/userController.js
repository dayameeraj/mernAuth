// controllers/userController.js

const User = require('../schemas/userSchema');

async function registerUser(req, res) {
  const { userName, password } = req.body;

  try {
    const newUser = new User({
      userName,
      password,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { registerUser };
