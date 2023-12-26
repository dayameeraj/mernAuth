const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    jwt.verify(
      token,
      "this is a secret change this later", // needs to be changed later add in ENV
      (err, decodedtoken) => {
        if (err) {
          res.status(401).json({ message: "Unauthorized: invalid token" });
        } else {
          res.status(200);
          next();
        }
      }
    );
  } else {
    res.status(401).json({ message: "Unauthorized: Missing or invalid token" });
  }
};

module.exports = { requireAuth };
