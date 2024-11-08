import { querySuppliers, insertSupplier } from "../models/supplierModel.js";

export async function getSuppliers(req, res) {
    try {
        const suppliers = await querySuppliers();
        res.status(200).json({suppliers: suppliers})
    } catch (error) {
        res.json({message: error.message})
    }
}

export async function addSupplier(req, res) {
    const {supplier_name, supplier_contact} = req.body;

    try {
        await insertSupplier(supplier_name, supplier_contact);
        res.status(201)
    } catch(error) {
        res.json({message: error.message})
    }
}