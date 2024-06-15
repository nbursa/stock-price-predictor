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

// username: nbursa
// password: qjSPnYlPwMvsRvkj
// database: Stock Price Predictor
// cluster: StockPriceCluster
// collection: stocks
// connection string: mongodb+srv://nbursa:qjSPnYlPwMvsRvkj@StockPriceCluster/Stock Price Predictor?retryWrites=true&w=majority

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
