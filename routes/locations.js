const express = require("express");
const router = express.Router();
const locationController = require("../app/api/controllers/locations");
router.get("/:address", locationController.getByAddress);
module.exports = router;
