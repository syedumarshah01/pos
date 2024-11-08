import express from 'express';
import { addToPurchaseHistory, getTotalPurchase } from "../controllers/purchaseHistoryController.js";

const purchaseRouter = express.Router();

purchaseRouter.post('/purchase_history', addToPurchaseHistory);
purchaseRouter.get('/totalpurchase', getTotalPurchase)


export default purchaseRouter;