const bookingModel = require("../models/bookings");
const userModel = require("../models/users");
const locationModel = require("../models/locations");
const multer = require("multer");

module.exports = {
  create: (req, res, next) => {
    bookingModel.create(
      {
        name: req.body.name,
        vehicleInfo: req.body.vehicleInfo,
        booked_on: req.body.booked_on,
        pump_location: req.body.pump_location,
      },
      (err, result) => {
        if (err) next(err);
        else
          res.json({
            status: "success",
            message: "Booking added successfully!!!",
            data: result,
          });
      }
    );
  },
  getByName: (req, res, next) => {
    userModel.findOne(
      {
        name: new RegExp(req.params.name, "i"),
        isDeleted: false,
        isBlocked: false,
      },
      (err, userInfo) => {
        if (userInfo) {
          bookingModel
            .findOne(
              { name: new RegExp(req.params.name, "i") },
              (err, bookingInfo) => {
                if (err) {
                  console.log(err);
                  next(err);
                } else {
                  res.json({
                    status: "success",
                    message: "Booking found!!!",
                    data: { bookings: bookingInfo },
                  });
                }
              }
            )
            .populate({
              path: "pump_location",
              model: locationModel,
              select: { _id: 1, loc: 1, address: 1 },
            });
        } else {
          res.json({
            status: "failed",
            message: "User not found!!!",
            data: null,
          });
        }
      }
    );
  },
  upload: (req, res, next) => {
    uploadFile(req, res, (err) => {
      if (err) {
        res.status(400).send(err);
      }
      res.send(req.file);
    });
  },
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadFile = multer({
  storage: storage,
  limits: { fileSize: 3000000 },
}).single("file");
