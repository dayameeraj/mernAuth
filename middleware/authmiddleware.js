const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const requireAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, JWT_SECRET, (err, decodedtoken) => {
      if (err) {
        res.status(401).json({ message: "Unauthorized: invalid token" });
      } else {
        res.status(200);
        next();
      }
    });
  } else {
    res
      .status(401)
      .json({ message: "Unauthorized: Missing token or invalid token" });
  }
};

module.exports = { requireAuth };
