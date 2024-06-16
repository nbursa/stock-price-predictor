import { Schema, model } from 'mongoose';

const predictionSchema = new Schema({
  input: {
    Open: { type: Number, required: true },
    High: { type: Number, required: true },
    Low: { type: Number, required: true },
    Close: { type: Number, required: true },
  },
  predictedVolume: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Prediction = model('Prediction', predictionSchema);

export default Prediction;
