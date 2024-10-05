
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cropSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    rain_min: {
      type: Number, 
      required: true, 
    },
    rain_max: {
      type: Number,
      required: true, 
    },
  }, 
  { timestamps: true });
  
  const Crop = mongoose.model('Crop', cropSchema);
  module.exports = Crop;
  