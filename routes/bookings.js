const express = require("express");
const router = express.Router();
const bookingController = require("../app/api/controllers/bookings");
router.post("/", bookingController.create);
router.get("/:name", bookingController.getByName);
router.post("/upload", bookingController.upload);
module.exports = router;
