import { Schema, model } from 'mongoose';

const stockSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  predictedPrice: { type: Number },
  actualPrice: { type: Number },
  accuracy: { type: Number },
});

const Stock = model('Stock', stockSchema);

export default Stock;
