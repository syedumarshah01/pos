import { insertToPaymentTable, queryTotalPayments } from "../models/paymentModel.js";

export async function completePayment(req, res) {
    const {billPaymentAmount} = req.body;

    try {
        await insertToPaymentTable(billPaymentAmount);
        res.status(201)
    } catch (error){
        res.status(500).json({message: error.message})
    }
}

export async function getTotalSale(req, res) {
    try {
        const result = await queryTotalPayments();
        res.status(200).json(result)
    } catch(error) {
        res.status(500).json({message: error})
    }
}

