import { queryItemData, querySuppliers, purchaseUpdate } from "../models/dataModel.js";

export async function getItemData(req, res) {
    const {itemcode} = req.body;

    try {
        const itemData = await queryItemData(itemcode);
        res.status(200).json(itemData);
    } catch (error) {
        res.status(404).json({ message: "Itemcode Does Not Exist"})
        
    }
}

export async function getSuppliers(req, res) {
    try {
        const suppliers = await querySuppliers();
        res.status(200).json({"suppliers": suppliers})
    } catch (error) {
        res.json({message: error.message})
    }
}


export async function purchase(req, res) {
    const { purchaseData } = req.body; 
    
    for(let dataItem in purchaseData) {
        const { itemcode, cost_price, sale_price, quantity } = purchaseData[dataItem];

        try {
            await purchaseUpdate(itemcode, cost_price, sale_price, quantity);
            res.status(201).json({
                message: "Purchase Posted Successfully..."
            })
        } catch(error) {
            console.log(error)
        }
    }
}