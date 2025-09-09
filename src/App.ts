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



// SSL certificate paths
// const privateKey = fs.readFileSync('/etc/letsencrypt/live/server.taxque.in/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/server.taxque.in/fullchain.pem', 'utf8');

// const credentials = {
//   key: privateKey,
//   cert: certificate
// };

// Create HTTPS server
// const httpsServer = https.createServer(credentials, app);


const allowedOrigins = [
  "https://server.taxque.in",
  "http://server.taxque.in",
  "https://f.taxque.in",
  "https://b.taxque.in",
  "http://localhost:5173",
  "http://localhost:5174",
  "https://your-production-site.com",
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
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        // allow requests with no origin (like Postman or server-to-server)
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        console.log(origin);

        callback(null, true);
      } else {
        callback(null, false); // deny without crashing
      }
    },
    credentials: true,
  })
);


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
