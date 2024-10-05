const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recommendationSchema = new Schema({
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    crop_id: {
      type: Schema.Types.ObjectId,
      ref: 'Crop',
    },
    rainfall_id: {
      type: Schema.Types.ObjectId,
      ref: 'Rainfall',
    },
    recommended_season: {
      type: String,
    },
  }, { timestamps: true });
  
  const Recommendation = mongoose.model('Recommendation', recommendationSchema);
  module.exports = Recommendation;
  