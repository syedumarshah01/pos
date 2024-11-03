import express from 'express';
import { completePayment } from '../controllers/paymentController.js';

const paymentRouter = express.Router()

paymentRouter.post('/payment', completePayment)

export default paymentRouter;