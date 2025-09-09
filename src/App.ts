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

// ✅ CRITICAL FIX: Conditional SSL for different environments
let httpsServer;
if (process.env.NODE_ENV === 'production' && process.env.USE_SSL === 'true') {
  try {
    // SSL certificate paths (only for your custom domain)
    const privateKey = fs.readFileSync('/etc/letsencrypt/live/server.taxque.in/privkey.pem', 'utf8');
    const certificate = fs.readFileSync('/etc/letsencrypt/live/server.taxque.in/fullchain.pem', 'utf8');

    const credentials = {
      key: privateKey,
      cert: certificate
    };

    // Create HTTPS server only if SSL certs are available
    httpsServer = https.createServer(credentials, app);
    console.log('HTTPS server configured');
  } catch (error) {
    console.log('SSL certificates not found, using HTTP:', error);
  }
}

const allowedOrigins = [
  "https://server.taxque.in",
  "http://server.taxque.in",
  "https://f.taxque.in",
  "https://f.taxque.in/",
  "https://b.taxque.in",
  "https://b.taxque.in/",
  "http://localhost:5173",
  "http://localhost:5174",
  // ✅ ADD: EB domain to allowed origins
  "http://taxqueserver-env.eba-zhia3ukp.ap-south-1.elasticbeanstalk.com",
  "https://taxqueserver-env.eba-zhia3ukp.ap-south-1.elasticbeanstalk.com"
];

mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("Database connected successful!"))
  .catch((err: any) =>
    console.log(
      "Database is not connected to the server, you are offline:",
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
        console.log('Allowed origin:', origin);
        callback(null, true);
      } else {
        console.log('Blocked origin:', origin);
        callback(null, false); // deny without crashing
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'fallback-secret',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// ✅ ADD: Health check route for EB
app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    message: 'TaxQue Server is running',
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'development'
  });
});

app.post("/taxque/api/blob", raw({ type: "*/*", limit: "5mb" }), HandleFile);
app.use("/taxque/api", Routes);

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

module.exports = app;