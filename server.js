const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRouter = require("./src/routes/auth");
const app = express();
const uri = process.env.MONGO_URI;

  app.use(express.json());

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to mongoDB");
  } catch (err) {
    console.log("Error connecting:", err);
  }
}
connect();
app.use('/routes/auth', authRouter)

app.listen(8000, () => {
  console.log("Server started on port 8000");
});

