const express = require("express");
const logger = require("morgan");
const users = require("./routes/users");
const bookings = require("./routes/bookings");
const locations = require("./routes/locations");
const bodyParser = require("body-parser");
const mongoose = require("./config/database"); //database configuration
var jwt = require("jsonwebtoken");
const app = express();

const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;
const secretKey = process.env.JWT_SECRET_KEY;

app.set("secretKey", secretKey); // jwt secret token

// connection to mongodb
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ demo: "Test Run" });
});

const validateUser = (req, res, next) => {
  jwt.verify(
    req.headers["x-access-token"],
    req.app.get("secretKey"),
    (err, decoded) => {
      if (err) {
        res.json({ status: "error", message: err.message, data: null });
      } else {
        // add user id to request
        req.body.userId = decoded.id;
        next();
      }
    }
  );
};

// public route
app.use("/users", users);

// private route
app.use("/bookings", validateUser, bookings);

app.use("/locations", validateUser, locations);

// express doesn't consider not found 404 as an error so we need to handle 404 it explicitly
// handle 404 error
app.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// handle errors
app.use((err, req, res, next) => {
  if (err.status === 404) res.status(404).json({ message: "Not found" });
  else res.status(500).json({ message: "Something looks wrong :( !!!" });
});

app.listen(port, () => {
  console.log(`Node server running on port : ${port}`);
});
