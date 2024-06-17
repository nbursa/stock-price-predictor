import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import stockRoutes from './routes/stockRoutes';
import statsRoutes from './routes/statsRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5005;
const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error('MONGO_URI environment variable is not defined');
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log(`Connected to MongoDB, using database: ${mongoose.connection.name}`))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

app.use('/api/stocks', stockRoutes);
app.use('/api/stats', statsRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle graceful shutdown
const gracefulShutdown = () => {
  server.close(() => {
    console.log('Server closed');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
