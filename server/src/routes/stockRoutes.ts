import { Router } from 'express';
import { getStocks, addStock } from '../controllers/stockController';

const router = Router();

router.get('/', getStocks);
router.post('/', addStock);

export default router;
