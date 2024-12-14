import { insertToPurchaseReturnHistory, queryTotalPurchaseReturns } from "../models/purchaseReturnHistoryModel.js";

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

export async function getTotalPurchaseReturns(req, res) {
    try {
        const result = await queryTotalPurchaseReturns();
        res.status(200).json(result)
    } catch(error) {
        res.status(500).json({message: error})
    }
}
