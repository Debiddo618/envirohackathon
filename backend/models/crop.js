const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cropSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rain_average: {
      type: Number,
      required: true,
    },
    start_date: {
      type: Date,
      required: false,
    },
    end_date: {
      type: Date,
      required: false,
    },
    harvest_date: {
      type: Date,
      required: false,
    },
    duration: {
      type: Number, // assuming the duration is in days
      required: false,
    },
  },
  { timestamps: true }
);

const Crop = mongoose.model("Crop", cropSchema);
module.exports = Crop;
