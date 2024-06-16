import { Request, Response } from 'express';
import axios from 'axios';
import Stock from '../models/Stock';
import Prediction from '../models/Prediction';

export const getStocks = async (req: Request, res: Response) => {
  const stocks = await Stock.find();
  res.json(stocks);
};

export const addStock = async (req: Request, res: Response) => {
  const stock = new Stock(req.body);
  await stock.save();
  res.json(stock);
};

export const predictStock = async (req: Request, res: Response) => {
  try {
    const response = await axios.post('http://localhost:5001/predict', req.body);
    const predictedVolume = response.data[0];

    const newPrediction = new Prediction({
      input: req.body[0],
      predictedVolume
    });

    await newPrediction.save();

    res.json(predictedVolume);
  } catch (error) {
    console.error('Error predicting stock:', error);
    res.status(500).send('Error predicting stock');
  }
};
