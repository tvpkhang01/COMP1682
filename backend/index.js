import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_DB)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error(err));
};

app.listen(3000, () => {
  dbConnect();
  console.log("Server is running on port 3000");
});
