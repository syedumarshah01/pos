import {clearBillArea, createDynamicElement, getTotalAmount, setTotalAmount, changePrice, changeQuantity, voidItem, handleCursorPosition, handlePayment, returnItem} from "./utils/utils.pos.js";

export const BILL_ITEMS = []
export let RETURN = false

$('#itemcodeInput').on('keydown', function (event){
    if(event.key === 'Enter') {
        event.stopPropagation()
        const searchTerm = $(this).val().trim();

        if(searchTerm.toUpperCase() === 'CLEAR') {
            clearBillArea()
        } else if(!Number(searchTerm) && !searchTerm == '') { // two equal works while three doesn't. WHY???
            alert('Itemcode Does Not Exist!')
        }
        else if(searchTerm && !RETURN) {
            fetchData(searchTerm)
        } else if(searchTerm && RETURN) {
            fetchData(searchTerm, returnItem)
        } else {
            $('#payment-amount').focus()
        }
        $(this).val(null)

    }
})


function fetchData(data, returnItem=null) {
    $.post('http://localhost:3000/search', {
        itemcode: data
    })
    .done(function(itemData) {

        if(BILL_ITEMS.includes(itemData.itemcode)) {
            // if(RETURN) {
            //     returnItem(itemData.itemcode)
            //     RETURN = false
            //     return
            // }
            let currQuantity = $('#' + `${itemData.itemcode}-item-quantity`)
            let currTotalPrice = $('#' + `${itemData.itemcode}-item-totalprice`)
            let newQuantity = Number(itemData.quantity) + Number(currQuantity.text())
            let newTotalPrice = Number(itemData.sale_price * itemData.quantity) + Number(currTotalPrice.text())
            
            currQuantity.text(newQuantity)
            currTotalPrice.text(newTotalPrice)

            if(!RETURN) setTotalAmount(getTotalAmount() + Number(itemData.sale_price) * Number(itemData.quantity))
            
        } else {
            const billArea = $('#section-two');
            createDynamicElement(itemData, billArea, BILL_ITEMS, RETURN)
        }

        if(RETURN) {
            returnItem(itemData.itemcode)
            RETURN = false
        }
    })
    .fail(function() {
        alert('Itemcode Does Not Exist')
    })
}

$('.changeprice').click(changePrice)
$('.changequantity').click(changeQuantity)
$('.void').click(voidItem)
$('.returnitem').click(() => {
    RETURN = true
})
    

handleCursorPosition()

handlePayment()
