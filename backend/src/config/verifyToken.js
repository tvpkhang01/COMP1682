const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) return res.status(401).json("Unauthenticated");
  jwt.verify(accessToken, process.env.SECRET_JWT, (err, user) => {
    if (err) return res.status(403).json("Wrong token");
    req.channel = user;
    next();
  });
};

module.exports = verifyToken;
