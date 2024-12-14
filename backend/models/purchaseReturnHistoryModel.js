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

export const queryTotalPurchaseReturns = () => {
    const sqlQueryPurchaseReturns = 'SELECT SUM(return_amount) as total_return_amount FROM purchase_return_history WHERE DATE(return_date_time) = CURDATE()'

    return new Promise((resolve, reject) => {
        CONN.query(sqlQueryPurchaseReturns, (err, results) => {
            if(err) return reject(err)

            const totalPurchaseReturnAmount = results.map(element => element.total_return_amount)
            resolve(totalPurchaseReturnAmount)
        })
    })
}