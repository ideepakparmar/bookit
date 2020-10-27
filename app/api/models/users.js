const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    trim: true,
    default: false,
  },
  createdAt: {
    type: Date,
    trim: true,
  },
  updatedAt: {
    type: Date,
    trim: true,
  },
});
// hash user password before saving into database
UserSchema.pre("save", (next) => {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});
UserSchema.index({ email: 1 }, { unique: true });
module.exports = mongoose.model("user", UserSchema);
