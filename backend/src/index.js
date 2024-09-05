const express = require("express");
const dotenv = require("dotenv");

const connectToDatabase = require("./config/dbConfig");

const app = express();
dotenv.config();

const PORT = process.env.SERVER_PORT || 8000;

app.use(express.json());

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
