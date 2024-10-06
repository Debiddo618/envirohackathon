const express = require("express");
const verifyToken = require("../middleware/verify-token.js");
const router = express.Router();
const Crop = require("../models/crop.js");



// Create Crops
router.post('/create', async (req, res) => {
  try {
      const createdCrop = await Crop.create(req.body);
      res.status(201).json(createdCrop);
  } catch (error) {
      res.status(500).json({ error: error.message })
  }
})

// index to show all crops
router.get("/", async (req, res) => {
  try {
    const crops = await Crop.find({});
    res.status(200).json(crops);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Create Crop
const create = async (formData) => {
  try {
      // Create a POST request thaty sends JSONified form data to the backend
      const res = await fetch(BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
      })
      // Return the response we get back from the backend
      return await res.json();
  } catch (err) {
      console.log(err)
  }
}


// Delete route
router.delete('/:cropId', async (req, res) => {
  try {
      const deletedCrop = await Crop.findByIdAndDelete(req.params.cropId)
      // Add a check for a not found pet
      if (!deletedCrop) {
          res.status(404);
          throw new Error('Crop not found.')
      }
      // Return an "OK" status if the pet was deleted successfully
      res.status(200).json(deletedCrop);
  } catch (error) {
      if (res.statusCode === 404) {
          res.json({ error: error.message })
      } else {
          res.status(500).json({ error: error.message })
      }
  }
})

module.exports = router;
