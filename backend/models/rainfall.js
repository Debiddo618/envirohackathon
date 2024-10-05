const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Rainfall Schema
const rainfallSchema = new Schema({
  location: {
    type: String,
  },
  total_precipitation: {
    type: Number,
  },
  monthly_precipitation: {
    type: Map,
    of: Number, // Monthly precipitation (in mm)
  },
  forecast_period: {
    type: Number,
  },
  start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
}, { timestamps: true });

const Rainfall = mongoose.model('Rainfall', rainfallSchema);
module.exports = Rainfall;
