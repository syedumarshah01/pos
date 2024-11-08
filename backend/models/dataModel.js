import {CONN} from '../config/database.js'

export function queryItemData(itemcode) {
    const sqlGet = 'SELECT product_name, cost_price, sale_price FROM items WHERE itemcode = ?';

    return new Promise((resolve, reject) => {
        CONN.query(sqlGet, [itemcode], (err, results) => {
        if(err) return reject(err)
        
        if(results.length === 0) return reject(new Error("Itemcode Does Not Exist"))
        
        const item = results[0]
        const {product_name, cost_price, sale_price} = item;
        const itemData = {
            itemcode: itemcode,
            product_name: product_name,
            cost_price: cost_price,
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
            
        })
    })
}


export const insertNewItem = (itemcode, itemName, costPrice, salePrice, supplier) => {
    const sqlInsertItem = 'INSERT INTO items (itemcode, product_name, on_hand, cost_price, sale_price, supplier) VALUES(?, ?, 0, ?, ?, ?)'

    return new Promise((resolve, reject) => {
        CONN.query(sqlInsertItem, [itemcode, itemName, costPrice, salePrice, supplier], (err) => {
            if(err) return reject(err)
            resolve({message: "Added Successfully..."})
        })
    })
}


export const purchaseUpdate = (itemcode, costPrice, salePrice, quantity) => {
    const sqlPurchase = 'UPDATE items SET cost_price = ?, sale_price = ?, on_hand = on_hand + ? WHERE itemcode = ?';

    return new Promise((resolve, reject) => {
        CONN.query(sqlPurchase, [costPrice, salePrice, quantity, itemcode], (err) => {
            if(err) return reject(err);
            resolve({message: "Purchased Successfully..."})
        })
    })
}

export const purchaseReturnUpdate = (itemcode, quantity) => {
    const sqlPurchaseReturn = 'UPDATE items SET on_hand = on_hand - ? WHERE itemcode = ?'

    return new Promise((resolve, reject) => {
        CONN.query(sqlPurchaseReturn, [quantity, itemcode], (err) => {
            if(err) return reject(err);
            resolve({message: "Posted Successfully..."})
        })
    })
}



export const updateItem = (itemCode, itemName, costPrice, salePrice, supplier) => {
    const sqlUpdateItem = 'UPDATE items SET product_name = ?, cost_price = ?, sale_price = ?, supplier = ? WHERE itemcode = ?';

    return new Promise((resolve, reject) => {
        CONN.query(sqlUpdateItem, [itemName, costPrice, salePrice, supplier, itemCode], (err) => {
            if(err) return reject(err)
            resolve({message: "Updated Successfully..."})
        })
    })

}
