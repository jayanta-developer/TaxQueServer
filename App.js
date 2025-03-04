const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const cors = require("cors");
const mongoose = require("mongoose");

const express = require("express");

//Routers
const Router = require("./Router");

//DB connection
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {})
  .then(() => console.log("Database connected successful!"))
  .catch((err) =>
    console.log(
      "Database is not concocted to the server, you are offline:",
      err
    )
  );

const App = express();
App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(cors());

// Router Mounting
App.use("/taxque/api/", Router);

// Export the app
module.exports = App;
