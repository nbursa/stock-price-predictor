import { Router } from 'express';
import {
  getStocks,
  addStock,
  predictStock,
} from '../controllers/stockController';

const stockRouter = Router();

stockRouter.get('/', getStocks);
stockRouter.post('/', addStock);
stockRouter.post('/predict', predictStock);

export default stockRouter;
