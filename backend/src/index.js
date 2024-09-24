const express = require("express");
const config = require("./config/config");

const connectToDatabase = require("./config/dbConfig");

const app = express();

connectToDatabase()
  .then(() => {
    require("./config/express")(app);
    require("./config/routes")(app);

    app.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`);
    });
  })
  .catch(console.error);
