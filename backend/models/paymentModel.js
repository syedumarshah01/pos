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