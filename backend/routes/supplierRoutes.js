import express from 'express';
import { getSuppliers, addSupplier } from "../controllers/supplierController.js";


const supplierRouter = express.Router()

supplierRouter.get('/suppliers', getSuppliers)
supplierRouter.post('/addsupplier', addSupplier)

export default supplierRouter;
