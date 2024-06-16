import { Schema, model } from 'mongoose';

const predictionSchema = new Schema({
  input: {
    Open: Number,
    High: Number,
    Low: Number,
    Close: Number,
  },
  predictedVolume: Number,
  date: { type: Date, default: Date.now }
});

const Prediction = model('Prediction', predictionSchema);

export default Prediction;
