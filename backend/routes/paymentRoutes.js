import express from 'express';
import { completePayment, getTotalSale } from '../controllers/paymentController.js';

const paymentRouter = express.Router()

paymentRouter.post('/payment', completePayment)
paymentRouter.get('/totalsale', getTotalSale)

export default paymentRouter;