//Set up mongoose connection
require("dotenv").config();
console.log("Connected to database");
const mongoose = require("mongoose");
const mongoDB = process.env.MONGODB_URL || "mongodb://localhost:27017/bookit";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;
