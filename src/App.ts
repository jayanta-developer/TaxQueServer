import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import Routes from "./Router/index";
import passport from "passport";
import session from "express-session";
const https = require('https');
const mongoose = require("mongoose");
const fs = require('fs');
import { raw } from "express";
import { HandleFile } from "./Controller/fileHandler";
const app = express();

const allowedOrigins = [
  "https://server.taxque.in",
  "http://server.taxque.in",
  "https://f.taxque.in",
  "https://b.taxque.in",
  "http://localhost:5173/"
];


mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("Database connected successful!"))
  .catch((err: any) =>
    console.log(
      "Database is not concocted to the server, you are offline:",
      err
    )
  );

app.use(express.json({ limit: "5mb" }));
app.use(express.raw({ type: "*/*", limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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

app.post("/taxque/api/blob", raw({ type: "*/*", limit: "5mb" }), HandleFile);

app.use("/taxque/api", Routes);

module.exports = app;
