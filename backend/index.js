import express, { application } from "express";
import dotenv, { config } from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import ticketRoute from "./routes/ticket.js";
import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

//for testing
app.get("/", (req, res) => {
  res.send("api is working");
});

// app.get("/tickets", (req, res) => {
//   res.send("page ticket");
// });
//database connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB database connected");
  } catch (error) {
    console.log("MongoDB database disconnected");
  }
};

//Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/auth", authRoute);
app.use("/tickets", ticketRoute);
app.use("/users", userRoute);

app.listen(port, () => {
  connect();
  console.log("server listening on port", port);
});