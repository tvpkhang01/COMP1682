const router = require("../routes/");

module.exports = (app) => {
  app.use("/auth", router.auth);
  app.use("/channel", router.channel);
  app.use("/video", router.video);
  app.use("/upload", router.upload);
  app.use("*", (res) =>
    res.send("<h1> Something went wrong. Try again. </h1>")
  );
};
