import { Request, Response } from 'express';
import Stock from '../models/Stock';

export const getStocks = async (req: Request, res: Response) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ message: (err as any).message });
  }
};

export const addStock = async (req: Request, res: Response) => {
  const stock = new Stock({
    name: req.body.name,
    price: req.body.price,
  });

  try {
    const newStock = await stock.save();
    res.status(201).json(newStock);
  } catch (err) {
    res.status(400).json({ message: (err as any).message });
  }
};
