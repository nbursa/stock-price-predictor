import { Router } from 'express';
import { getStocks, addStock, predictStock } from '../controllers/stockController';

const router = Router();

router.get('/', getStocks);
router.post('/', addStock);
router.post('/predict', predictStock);

export default router;
