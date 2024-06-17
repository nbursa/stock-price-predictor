import mongoose from 'mongoose';

const InputSchema = new mongoose.Schema({
  Open: {
    type: Number,
    min: 0,
    required: true,
  },
  High: {
    type: Number,
    min: 0,
    required: true,
  },
  Low: {
    type: Number,
    min: 0,
    required: true,
  },
  Close: {
    type: Number,
    min: 0,
    required: true,
  },
}, { _id: false });

const PredictionSchema = new mongoose.Schema({
  input: {
    type: InputSchema,
    required: true,
  },
  predictedVolume: {
    type: Number,
    min: 0,
    required: true,
  },
}, { timestamps: true });

// Add indexes if necessary based on your query patterns
// For example, if you frequently query by predictedVolume, you might add an index on it:
// PredictionSchema.index({ predictedVolume: 1 });

const Prediction = mongoose.model('Prediction', PredictionSchema);

export default Prediction;
