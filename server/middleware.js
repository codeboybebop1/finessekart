const jwt = require("jsonwebtoken");
require('dotenv').config();
const JWT_key = process.env.JWT_SECRET;

function verifyJWT(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token provided or invalid format",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_key);

    req.user = decoded; // contains userId if token was signed properly

    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    return res.status(401).json({
      message: "Token verification failed",
    });
  }
}

module.exports = verifyJWT;