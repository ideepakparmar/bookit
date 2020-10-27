const mongoose = require("mongoose");
const { VEHICLE } = require("../../../config/constants");
//Define a schema
const Schema = mongoose.Schema;
const BookingSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  vehicleInfo: [
    {
      vehicleNumber: { type: String, required: true },
      type: {
        type: String,
        enum: [VEHICLE.TYPE.GAS, VEHICLE.TYPE.PETROL, VEHICLE.TYPE.DIESEL],
        required: true,
      },
    },
  ],
  pump_location: {
    type: Schema.ObjectId,
    ref: "location",
  },
  booked_on: {
    type: Date,
    trim: true,
    required: true,
  },
});
module.exports = mongoose.model("booking", BookingSchema);
