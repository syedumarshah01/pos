import express from 'express';
import { addToPurchaseReturnHistory } from '../controllers/purchaseReturnHistoryController.js';

const purchaseReturnRouter = express.Router()

purchaseReturnRouter.post('/purchase_return_history', addToPurchaseReturnHistory)

export default purchaseReturnRouter;