const express = require("express");
const config = require("./config/config");
const connectToDatabase = require("./config/dbConfig");

const app = express();

connectToDatabase()
  .then(() => {
    require("./config/middleware")(app);
    require("./config/routes")(app);

    app.use(express.json());
    app.use(express.static("asset"));
    app.use("/media/image", express.static(__dirname + "/asset/image"));
    app.use("/media/avatar", express.static(__dirname + "/asset/avatar"));
    app.use("/media/video", express.static(__dirname + "/asset/video"));
    app.use("/media/banner", express.static(__dirname + "/asset/banner"));

    app.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`);
    });
  })
  .catch(console.error);
