import { CONN } from "../config/database.js";

export const insertToPaymentTable = (paymentAmount) => {
    const sqlInsertPayment = 'INSERT INTO  payment_history (payment_amount) VALUES (?)';
    
    return new Promise((resolve, reject) => {
        CONN.query(sqlInsertPayment, [paymentAmount], (err) => {
            if(err) return reject(err);
            resolve({
                message: "Payment Inserted..."
            })
            
        })
    })

}

export const queryTotalPayments = () => {
    const sqlQueryPayments = 'SELECT SUM(payment_amount) as total_sale FROM payment_history WHERE DATE(payment_date_time) = CURDATE()';

    return new Promise((resolve, reject) => {
        CONN.query(sqlQueryPayments, (err, results) => {
            if(err) return reject(err);
            const totalPaymentAmount = results.map(element => element.total_sale)
            resolve(totalPaymentAmount)
        })
    })
}

