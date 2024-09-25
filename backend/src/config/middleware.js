const cookieParser = require("cookie-parser");
const cors = require("cors");

const middleware = (app) => {
  app.use(cookieParser());
  app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));
};

module.exports = middleware;
