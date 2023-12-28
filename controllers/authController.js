const User = require("../schemas/userSchema");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { jwtExpierTimer } = require("./constants");

const handelError = (err) => {
  let error = { username: "", password: "" };
  // user not found
  if (err.message === "incorrect password!") {
    error.password = "invalid password ";
  }
  // incorrect password
  if (err.message === "user not found!") {
    error.username = "username is not found";
  }
  // if username is unique
  if (err.code === 11000) {
    error.username = "username already exists";
    return error;
  }
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    });
  }
  return error;
};

const createToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: jwtExpierTimer,
  });
};

async function signupPost(req, res) {
  const { username, password } = req.body;

  try {
    const newUser = new User({
      username,
      password,
    });
    await newUser.save();
    const token = createToken(newUser._id);
    res
      .status(201)
      .json({ message: "User registered successfully!", token: token });
  } catch (error) {
    const errors = handelError(error);
    res.status(500).json({ errors });
  }
}

async function loginPost(req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.status(200).json({
      message: "sucessfully logged in ",
      user: user.username,
      token: token,
    });
  } catch (err) {
    const error = handelError(err);
    res.status(400).json({ error });
  }
}

module.exports = { signupPost, loginPost };
