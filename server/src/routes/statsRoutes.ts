import { Router } from 'express';
import { getPredictionStats } from '../controllers/statsController';

const statsRouter = Router();

statsRouter.get('/', getPredictionStats);

export default statsRouter;
