const express = require("express");
const verifyToken = require("../middleware/verify-token.js");
const router = express.Router();
const Crop = require("../models/crop.js");

// index to show all crops
router.get("/", async (req, res) => {
  try {
    const crops = await Crop.find({});
    res.status(200).json(crops);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
