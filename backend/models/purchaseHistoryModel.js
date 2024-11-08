import { CONN } from '../config/database.js';

export const insertToPurchaseHistory = (supplier, purchaseAmount) => {
    const sqlInsertPurchase = 'INSERT INTO purchase_history (supplier, purchase_amount) VALUES (?, ?)'

    return new Promise((resolve, reject) => {
        CONN.query(sqlInsertPurchase, [supplier, purchaseAmount], (err) => {
            if(err) return reject(err)
            resolve()
        })
    })
}

export const queryTotalPurchases = () => {
    const sqlQueryPurchases = 'SELECT SUM(purchase_amount) as total_purchase FROM purchase_history WHERE DATE(purchase_date_time) = CURDATE()'

    return new Promise((resolve, reject) => {
        CONN.query(sqlQueryPurchases, (err, results) => {
            if(err) return reject(err);

            const totalPurchaseAmount = results.map(element => element.total_purchase)
            resolve(totalPurchaseAmount)
        })
    })
}