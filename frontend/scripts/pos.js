import { fetchData } from "./api.js";
import * as posUtils from "./pos.utils.js";

export const BILL_ITEMS = []
export let RETURN = false

const ALERT_MESSAGE = 'Itemcode Does Not Exist'


$('#itemcodeInput').on('keydown', function (event){
    if(event.key === 'Enter') {
        event.stopPropagation()
        const searchTerm = $(this).val().trim();

        if(searchTerm.toUpperCase() === 'CLEAR') {
            posUtils.clearBillArea()
        } else if(!Number(searchTerm) && !searchTerm == '') { // two equal works while three doesn't. WHY???
            alert(ALERT_MESSAGE)
        }
        else if(searchTerm && !RETURN) {
            fetchData('/search', {itemcode: searchTerm})
            .then(data => handleData(data))
            .catch((err) => {
                console.log(err)
                alert(ALERT_MESSAGE)
            })
        } else if(searchTerm && RETURN) {
            fetchData('/search', {itemcode: searchTerm})
            .then(data => handleData(data, returnItem))
            .catch(err => console.log(err))
        } else {
            $('#payment-amount').focus()
        }
        $(this).val(null)

    }
})



function handleData(itemData, returnItem=null) {
    if(BILL_ITEMS.includes(itemData.itemcode)) {
        let currQuantity = $('#' + `${itemData.itemcode}-item-quantity`)
        let currTotalPrice = $('#' + `${itemData.itemcode}-item-totalprice`)
        let newQuantity = Number(itemData.quantity) + Number(currQuantity.text())
        let newTotalPrice = Number(itemData.sale_price * itemData.quantity) + Number(currTotalPrice.text())
        
        currQuantity.text(newQuantity)
        currTotalPrice.text(newTotalPrice)

        if(!RETURN) posUtils.setTotalAmount(posUtils.getTotalAmount() + Number(itemData.sale_price) * Number(itemData.quantity))
        
    } else {
        const billArea = $('#section-two');
        posUtils.createDynamicElement(itemData, billArea, {billItems: BILL_ITEMS, RETURN: RETURN})
    }

    if(RETURN) {
        returnItem(itemData.itemcode)
        RETURN = false
    }
}



$('.changeprice').click(posUtils.changePrice)
$('.changequantity').click(posUtils.changeQuantity)
$('.void').click(posUtils.voidItem)
$('.returnitem').click(() => {
    RETURN = true
})
    
posUtils.handleCursorPosition()
posUtils.handlePayment()
