import { insertToPurchaseReturnHistory } from "../models/purchaseReturnHistory.js";

export async function addToPurchaseReturnHistory(req, res) {
    const { supplier, purchaseReturnAmount } = req.body;

    try {
        await insertToPurchaseReturnHistory(supplier, purchaseReturnAmount);
        res.status(201)
    } catch(error) {
        res.json({
            message: error
        })
    }
}
