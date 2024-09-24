const dotenv = require('dotenv');

dotenv.config();
const PORT = "development";

const config = {
  development: {
    port: process.env.SERVER_PORT || 8000,
    dbURL: process.env.MONGODB_URI,
    authCookieName: "x-auth-token",
  },
  production: {},
};

module.exports = config[PORT];