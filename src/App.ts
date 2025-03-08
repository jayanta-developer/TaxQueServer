import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import Routes from "./Router/index";
import passport from "passport";
import session from "express-session";
const mongoose = require("mongoose");

dotenv.config();
const app = express();

mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("Database connected successful!"))
  .catch((err: any) =>
    console.log(
      "Database is not concocted to the server, you are offline:",
      err
    )
  );

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/taxque/api", Routes);

module.exports = app;
