import {CONN} from '../config/database.js'

export function queryItemData(itemcode) {
    const sqlGet = 'SELECT product_name, sale_price FROM items WHERE itemcode = ?';

    return new Promise((resolve, reject) => {
        CONN.query(sqlGet, [itemcode], (err, results) => {
        if(err) return reject(err)
        
        if(results.length === 0) return reject()
        
        const item = results[0]
        const {product_name, sale_price} = item;
        const itemData = {
            itemcode: itemcode,
            product_name: product_name,
            sale_price: sale_price,
            quantity: 1
        }
        resolve(itemData);
        return
        
    })
    
}
)}

export const queryItemQuantity = (itemcode) => {
    const sqlGetQuantity = 'SELECT quantity FROM items WHERE itemcode = ?';

    return new Promise((resolve, reject) => {
        CONN.query(sqlGetQuantity, [itemcode], (err, results) => {
            if(err) {
                reject(err);
                return;
            }
    
            const { itemQuantity } = results[0] 
            
            resolve({
                quantity: itemQuantity
            })
            return;
        })
    })
}


export const updateItemQuantity = (itemcode, quantity) => {
    const sqlUpdateQuantity = 'UPDATE items SET on_hand = ? WHERE itemcode = ?';

    return new Promise((resolve, reject) => {
        CONN.query(sqlUpdateQuantity, [quantity, itemcode], (err) => {
            if(err) return reject(err)
            resolve({
                message: "Updated Successfully..."
            }) 
            return
        })
    })
}

export const querySuppliers = () => {
    const sqlGetSuppliers = 'SELECT DISTINCT supplier FROM items';

    return new Promise((resolve, reject) => {
        CONN.query(sqlGetSuppliers, (err, results) => {
            if(err) return reject(err);

            const suppliers = results.map(item => item.supplier);
            resolve(suppliers)
        })
    })
}


export const purchaseUpdate = (itemcode, costPrice, salePrice, quantity) => {
    const sqlPurchase = 'UPDATE items SET cost_price = ?, sale_price = ?, on_hand = on_hand + ? WHERE itemcode = ?';

    return new Promise((resolve, reject) => {
        CONN.query(sqlPurchase, [costPrice, salePrice, quantity, itemcode], (err) => {
            if(err) return reject(err);
            resolve()
        })
    })
}

