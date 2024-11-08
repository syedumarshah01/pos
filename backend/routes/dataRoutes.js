import express from 'express';
import { getItemData, purchase, addNewItem, updateItemData, purchaseReturn } from '../controllers/dataController.js';

const dataRouter = express.Router();

dataRouter.post('/search', getItemData)
dataRouter.post('/additem', addNewItem)
dataRouter.post('/purchase', purchase)
dataRouter.post('/updateitem', updateItemData)
dataRouter.post('/purchasereturn', purchaseReturn)



export default dataRouter;