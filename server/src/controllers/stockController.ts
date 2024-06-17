import { Request, Response } from 'express';
import axios from 'axios';
import Stock from '../models/Stock';
import Prediction from '../models/Prediction';
import PredictionStats from '../models/PredictionStats';

export const getStocks = async (req: Request, res: Response) => {
  try {
    const stocks = await Stock.find();
    console.log('Fetched stocks:', stocks);
    res.json(stocks);
  } catch (error) {
    console.error('Error fetching stocks:', error);
    res.status(500).json({ error: 'Error fetching stocks' });
  }
};

export const addStock = async (req: Request, res: Response) => {
  try {
    const stock = new Stock(req.body);
    await stock.save();
    console.log('Added stock:', stock);
    res.json(stock);
  } catch (error) {
    console.error('Error adding stock:', error);
    res.status(500).json({ error: 'Error adding stock' });
  }
};

export const predictStock = async (req: Request, res: Response) => {
  try {
    console.log('Received request body:', req.body);

    // Make prediction request to the machine learning service
    const response = await axios.post('http://localhost:5001/predict', req.body);
    const predictedVolume = response.data.Prediction;

    console.log('Predicted volume:', predictedVolume);

    // Save the prediction to the database
    const newPrediction = new Prediction({
      input: req.body,
      predictedVolume,
    });
    await newPrediction.save();
    console.log('Prediction saved:', newPrediction);

    // Update PredictionStats
    let stats = await PredictionStats.findOne();
    if (!stats) {
      stats = new PredictionStats({
        accuracy: 0,
        mostPredictedStock: req.body.Stock,
      });
      console.log('Creating new stats:', stats);
    } else {
      stats.mostPredictedStock = req.body.Stock;
      const totalPredictions = await Prediction.countDocuments();
      const correctPredictions = await Prediction.countDocuments({
        predictedVolume: { $gte: 0.9, $lte: 1.1 },
      });
      stats.accuracy = (correctPredictions / totalPredictions) * 100;
      console.log('Updated stats:', stats);
    }

    await stats.save();
    console.log('Prediction stats updated:', stats);

    res.json({ predictedVolume });
  } catch (error) {
    console.error('Error predicting stock:', error);
    res.status(500).json({ error: 'Error predicting stock' });
  }
};
