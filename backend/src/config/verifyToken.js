const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Unauthenticated");
  jwt.verify(token, process.env.SECRET_JWT, (err, user) => {
    if (err) return res.status(403).json("Wrong token");
    req.channel = user;
    next();
  });
};

module.exports = verifyToken;
