import express from 'express';
import { addToPurchaseReturnHistory, getTotalPurchaseReturns } from '../controllers/purchaseReturnHistoryController.js';

const purchaseReturnRouter = express.Router()

purchaseReturnRouter.post('/purchase_return_history', addToPurchaseReturnHistory)
purchaseReturnRouter.get('/totalpurchasereturn', getTotalPurchaseReturns)

export default purchaseReturnRouter;