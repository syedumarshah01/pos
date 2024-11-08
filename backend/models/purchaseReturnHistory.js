import { CONN } from "../config/database.js";

export const insertToPurchaseReturnHistory = (supplier, purchaseReturnAmount) => {
    const sqlInsertPurchaseReturn = 'INSERT INTO purchase_return_history (supplier, return_amount) VALUES (?, ?)'

    return new Promise((resolve, reject) => {
        CONN.query(sqlInsertPurchaseReturn, [supplier, purchaseReturnAmount], (err) => {
            if(err) return reject(err)
            resolve()
        })
    })
}