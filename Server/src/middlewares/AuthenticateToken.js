const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer <token>"

  /// If no token is provided, return 401 Unauthorized
  if (!token) return res.sendStatus(401);

  /// Verifying the token using the secret key from environment variables
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    console.log("Authenticated user:", user);
    next();
  });
};

module.exports = authenticateToken;