const locationModel = require("../models/locations");

module.exports = {
  getByAddress: (req, res, next) => {
    locationModel.findOne(
      { address: new RegExp(req.params.address, "i") },
      (err, locationInfo) => {
        if (err) {
          console.log(err);
          next(err);
        } else {
          res.json({
            status: "success",
            message: "location found!!!",
            data: { locations: locationInfo },
          });
        }
      }
    );
  },
};
