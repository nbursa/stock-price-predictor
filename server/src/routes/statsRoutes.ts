import { Router } from 'express'
import { getPredictionStats } from '../controllers/statsController'

const router = Router()

router.get('/', getPredictionStats)

export default router
