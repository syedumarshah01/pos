import { insertToPurchaseHistory, queryTotalPurchases } from "../models/purchaseHistoryModel.js";

export async function addToPurchaseHistory(req, res) {
    const { supplier, purchaseAmount } = req.body;

    try {
        await insertToPurchaseHistory(supplier, purchaseAmount);
        res.status(201)
    } catch(error) {
        res.json({
            message: error
        })
    }
}


export async function getTotalPurchase(req, res) {
    try {
        const result = await queryTotalPurchases();
        res.status(200).json(result)
    } catch (error){
        res.status(500).json({message: error})
    }
}