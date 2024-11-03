import express from 'express';
import { getItemData, getSuppliers, purchase } from '../controllers/dataController.js';

const dataRouter = express.Router();

dataRouter.get('/suppliers', getSuppliers)
dataRouter.post('/search', getItemData)
dataRouter.post('/purchase', purchase)


export default dataRouter;