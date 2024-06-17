import mongoose from 'mongoose';

const PredictionStatsSchema = new mongoose.Schema({
  accuracy: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
    required: true,
  },
  mostPredictedStock: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Add an index on the mostPredictedStock field to improve query performance
PredictionStatsSchema.index({ mostPredictedStock: 1 });

const PredictionStats = mongoose.model('PredictionStats', PredictionStatsSchema);

export default PredictionStats;
