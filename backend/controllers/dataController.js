import { queryItemData, purchaseUpdate, insertNewItem, updateItem, purchaseReturnUpdate } from "../models/dataModel.js";

export async function getItemData(req, res) {
    const {itemcode} = req.body;

    try {
        const itemData = await queryItemData(itemcode);
        res.status(200).json(itemData);
    } catch (error) {
        res.status(404).json(error)
        
    }
}

export async function addNewItem(req, res) {
    const {itemcode, itemname, cost_price, sale_price, supplier} = req.body;

    try {
        const result = await insertNewItem(itemcode, itemname, cost_price, sale_price, supplier)
        res.status(201).json(result)
    } catch(error) {
        res.json({message: error})
    }
}



export async function purchase(req, res) {
    const { purchaseData } = req.body; 
    
    for(let dataItem in purchaseData) {
        const { itemcode, cost_price, sale_price, quantity } = purchaseData[dataItem];

        try {
            const result = await purchaseUpdate(itemcode, cost_price, sale_price, quantity);
            res.status(201).json(result)
        } catch(error) {
            console.log(error)
            res.status(500).json({message: error})
        }
    }
}

export async function purchaseReturn(req, res) {
    const {purchaseReturnData} = req.body;

    for(let dataItem in purchaseReturnData) {
        const {itemcode, quantity} = purchaseReturnData[dataItem];

        try {
            const result = await purchaseReturnUpdate(itemcode, quantity)
            res.status(200).json(result)
        } catch(error) {
            res.status(500).json(error)
        }
    }
}


export async function updateItemData(req, res) {
    const {itemcode, itemname, cost_price, sale_price, supplier} = req.body;

    try {
        const result = await updateItem(itemcode, itemname, cost_price, sale_price, supplier);
        res.status(201).json(result)
    } catch(error) {
        res.json({message: error})
    }
}