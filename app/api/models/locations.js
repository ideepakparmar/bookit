const mongoose = require("mongoose");
//Define a schema
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  country: {
    type: String,
    trim: true,
    required: true,
  },
  city: {
    type: String,
    trim: true,
    required: true,
  },
  address: {
    type: String,
    trim: true,
    required: true,
  },
  loc: {
    type: { type: String, trim: true },
    coordinates: [],
  },
});

LocationSchema.pre("save", (next) => {
  next();
});

LocationSchema.index({ loc: "2dsphere" });
module.exports = mongoose.model("location", LocationSchema);
