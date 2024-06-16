import { Schema, model } from 'mongoose';

const predictionStatsSchema = new Schema({
  accuracy: { type: Number, required: true },
  mostPredictedStock: { type: String, required: true },
});

const PredictionStats = model('PredictionStats', predictionStatsSchema);

export default PredictionStats;
