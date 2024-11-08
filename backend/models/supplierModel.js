import { CONN } from "../config/database.js";

export const querySuppliers = () => {
    const sqlGetSuppliers = 'SELECT DISTINCT supplier FROM suppliers';

    return new Promise((resolve, reject) => {
        CONN.query(sqlGetSuppliers, (err, results) => {
            if(err) return reject(err);

            const suppliers = results.map(item => item.supplier);
            resolve(suppliers)
        })
    })
}


export const insertSupplier = (supplierName, supplierContact) => {
    const sqlAddSupplier = 'INSERT INTO suppliers (supplier, contact) VALUES (?, ?)';

    return new Promise((resolve, reject) => {
        CONN.query(sqlAddSupplier, [supplierName, supplierContact], (err) => {
            if(err) return reject(err)
            resolve()
        })
    })
}