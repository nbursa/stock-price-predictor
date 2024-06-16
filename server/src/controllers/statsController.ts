import { Request, Response } from 'express';
import PredictionStats from '../models/PredictionStats';

export const getPredictionStats = async (req: Request, res: Response) => {
  try {
    const stats = await PredictionStats.findOne();
    if (!stats) {
      return res.json({ accuracy: 0, mostPredictedStock: 'N/A' });
    }
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch prediction stats' });
  }
};
