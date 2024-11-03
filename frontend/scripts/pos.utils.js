import { BILL_ITEMS } from './pos.js'
import { postData } from './api.js'

export const VOID_ITEMS = []

export function getTotalAmount() {
    const totalAmount = $('#total-amount')
    return Number(totalAmount.text())
}

export function setTotalAmount(newPrice) {
    const totalAmount = $('#total-amount')
    totalAmount.text(newPrice) 
}



export function createDynamicElement(itemData, billArea, options = {}) {
    const {billItems = undefined, quantity = 1, RETURN = false, purchaseMode = false} = options;
    
    const billItem = document.createElement('div')
        $(billItem).addClass('border-bottom customize-item product-item')
        $(billItem).attr('id', `${itemData.itemcode}`)


        let itemCostPrice = null;
        if(purchaseMode) {
            itemCostPrice = document.createElement('span')
            $(itemCostPrice).attr('id', `${itemData.itemcode}-item-cost-price`).text(itemData.cost_price)
        }
        const itemName = document.createElement('span');
        const itemPrice = document.createElement('span');
        const itemQuantity = document.createElement('span');
        const itemTotalPrice = document.createElement('span');

        $(itemName).attr('id', `${itemData.itemcode}-item-name`).text(itemData.product_name)
        $(itemPrice).attr('id', `${itemData.itemcode}-item-price`).text(itemData.sale_price)
        $(itemQuantity).attr('id', `${itemData.itemcode}-item-quantity`).text(quantity)
        $(itemTotalPrice).attr('id', `${itemData.itemcode}-item-totalprice`).text(quantity * itemData.sale_price)

        billItem.append(itemName)
        if(purchaseMode) billItem.append(itemCostPrice)
        billItem.append(itemPrice)
        billItem.append(itemQuantity)
        billItem.append(itemTotalPrice)

        billArea.append(billItem)
        if(!purchaseMode) billItems.push(itemData.itemcode)

        if(!RETURN) setTotalAmount(getTotalAmount() + Number(itemData.sale_price) * Number(itemData.quantity))
        
        
}


// Learn Promises
// const promise = new Promise()

export function changePrice() {
    BILL_ITEMS.forEach(item => {
        $('#' + `${item}-item-price`).on('click', handlePriceChange)
    })
}

function removePriceEventListeners() {
    BILL_ITEMS.forEach(item => {
        $('#' + `${item}-item-price`).off('click', handlePriceChange) 
     })
}


function handlePriceChange() {
    removePriceEventListeners()

    let {currPrice, currQuantity, currTotalPrice} = getItemProperties($(this))    

    const priceInput = $('#priceInput')
    priceInput.attr('placeholder', currPrice.text())

    priceInput.on('keydown', function handlePriceInput(event) {
        if(event.key === "Enter") {
            event.stopPropagation()

            if(!Number($(this).val())) return alert("Enter Correct Amount")

            const newPrice = $(this).val();
            const newTotalPrice = Number(newPrice) * Number(currQuantity.text())

            totalAmountCalculation(Number(currTotalPrice.text()), newTotalPrice)
            currPrice.text(newPrice) 
            currTotalPrice.text(newTotalPrice) 
            
            priceInput.removeAttr('placeholder')
            priceInput.off('keydown', handlePriceInput)
            $(this).val(null)
            $('#itemcodeInput').focus()
        }

        
    })
}


export function changeQuantity() {
    BILL_ITEMS.forEach(item => {
        $('#' + `${item}-item-quantity`).on('click', handleQuantityChange)
    })
}

function removeQuantityEventListeners() {
    BILL_ITEMS.forEach(item => {
        $('#' + `${item}-item-quantity`).off('click', handleQuantityChange)
    })
}

function handleQuantityChange() {
    removeQuantityEventListeners()

    let {currPrice, currQuantity, currTotalPrice} = getItemProperties($(this))
    
    const quantityInput = $('#quantityInput')
    quantityInput.attr('placeholder', currQuantity.text())

    quantityInput.on('keydown', function handleQuantityInput(event) {
        if(event.key === "Enter") {
            event.stopPropagation()

            if(!Number($(this).val())) return alert("Enter Correct Quantity")

            const newQuantity = $(this).val();
            const newTotalPrice = Number(currPrice.text()) * Number(newQuantity)

            totalAmountCalculation(Number(currTotalPrice.text()), newTotalPrice)
            currQuantity.text(newQuantity) 
            currTotalPrice.text(newTotalPrice)

            quantityInput.removeAttr('placeholder')
            quantityInput.off('keydown', handleQuantityInput)
            $(this).val(null)
            $('#itemcodeInput').focus()
        }
    })
}


export function voidItem() {
    BILL_ITEMS.forEach(item => {
        $('#' + item).on('click', handleVoid)
    })
}


function removeVoidEventListeners() {
    BILL_ITEMS.forEach(item => {
        $('#' + item).off('click', handleVoid)
    })
}


function handleVoid() {
    removeVoidEventListeners()

    let {itemId, currTotalPrice} = getItemProperties($(this))

    setTotalAmount(getTotalAmount() - Number(currTotalPrice.text()))
    $(this).remove()

    const index = BILL_ITEMS.indexOf(itemId)
    if(index !== -1) BILL_ITEMS.splice(index, 1)
}

export function returnItem(itemcode) {
    const item = $('#' + itemcode)

    const {currPrice, currQuantity, currTotalPrice} = getItemProperties(item)

    currQuantity.text(Number(currQuantity.text()) - 1)
    if(Number(currQuantity.text()) === 1) {
        currQuantity.text('-1')
        setTotalAmount(getTotalAmount() - Number(currPrice.text()))
    } else if(Number(currQuantity.text()) <= 0) {
        currQuantity.text(Number(currQuantity.text()) - 1)
    } else {
        currQuantity.text(Number(currQuantity.text()) - 1)
    }
    currTotalPrice.text(Number(currPrice.text()) * Number(currQuantity.text()))
    
    setTotalAmount(getTotalAmount() - Number(currPrice.text()))
}


function getItemProperties(item) {
    let anyProperty = $(item).attr('id')
    let itemUniqueId = []
    for(let i = 0; i<anyProperty.length; i++) {
        if(Number(anyProperty[i]) || anyProperty[i] === '0') itemUniqueId.push(anyProperty[i])
    }
    
    let price = $('#' + `${itemUniqueId.join('')}-item-price`)
    let quantity = $('#' + `${itemUniqueId.join('')}-item-quantity`)
    let totalPrice = $('#' + `${itemUniqueId.join('')}-item-totalprice`)
    return {
        itemId: itemUniqueId.join(''),
        currPrice: price,
        currQuantity: quantity,
        currTotalPrice: totalPrice
    }
}


function totalAmountCalculation(currTotalPrice, newTotalPrice) {
    if(currTotalPrice > newTotalPrice) {
        setTotalAmount(getTotalAmount() - (currTotalPrice - newTotalPrice))
    } else {
        setTotalAmount(getTotalAmount() + (newTotalPrice - currTotalPrice))
    }
}


export function clearBillArea() {
    const billArea = $('#section-two')
    billArea.empty()
    $('#payment-amount').val(null)
    $('#change').text(null)
    setTotalAmount(0)
    BILL_ITEMS.splice(0, BILL_ITEMS.length)
}


export function handleCursorPosition() {
    const itemcodeInput = $('#itemcodeInput')
    const paymentInput = $('#payment-amount')

    $(document).on('keydown', function(event) {
        if(event.key === "Enter") {
            if(document.activeElement === itemcodeInput) paymentInput.focus()
            else itemcodeInput.focus()
        }
    })
}

export function handlePayment() {
    const paymentInput = $('#payment-amount')
    const change = $('#change')

    paymentInput.on('keydown', function(event) {
        if(event.key === "Enter") {
            // event.stopPropagation() The cursor won't move back and forth to itemcode area if this option is set
            if(!Number($(this).val()) && !$(this).val() == '') return alert("Enter Correct Amount")
            const paymentAmount = Number($(this).val())

            if(!paymentAmount) {
                return
            } else if(paymentAmount >= getTotalAmount()) {
                postData('/payment', {billPaymentAmount: getTotalAmount()})
                change.text(paymentAmount - getTotalAmount())
                $(this).val(null)
            } else {
                event.stopPropagation()
                alert("Enter Correct Amount")
            }
        }
    })
}


