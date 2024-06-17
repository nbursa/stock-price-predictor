import mongoose from 'mongoose';

const StockSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensure each stock name is unique
    trim: true,   // Trim whitespace
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Price should be non-negative
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Add an index on the name field to improve query performance
StockSchema.index({ name: 1 });

const Stock = mongoose.model('Stock', StockSchema);

export default Stock;
