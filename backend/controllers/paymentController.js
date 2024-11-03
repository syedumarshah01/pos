import { insertToPaymentTable } from "../models/paymentModel.js";

export async function completePayment(req, res) {
    const {billPaymentAmount} = req.body;

    try {
        await insertToPaymentTable(billPaymentAmount);
        res.status(201)
    } catch (error){
        res.status(500).json({message: error.message})
    }
}