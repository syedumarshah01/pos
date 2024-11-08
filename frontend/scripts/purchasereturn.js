import { createDynamicElement } from "./pos.utils.js";
import { fetchData, postData } from "./api.js";

const itemsPurchaseReturnData = {}
let currentItem = null;


$(document).ready(() => {

    fetchData('/suppliers')
    .then((data) => {
        for(let i = 0; i<data.suppliers.length; i++) {
            const option_element = document.createElement('option')
            $(option_element).attr('value', data.suppliers[i])
            $(option_element).text(data.suppliers[i])
            $("#suppliers").append(option_element)
        }
    })



})


$("#itemcode").on('keydown', function (event) {
    if(event.key === 'Enter') {
        $("#cost").focus()
        const item_code = $(this).val().trim()

        fetchData('/search', {itemcode: item_code})
        .then((data) => {
            $('#cost').val(data.cost_price)
            $('#sale').val(data.sale_price)

        })
        .catch((err) => {
            console.log(err)
            alert("Itemcode Does Not Exist.")
        })

        fetchData('/search', {itemcode: item_code})
        .then((data) => {
            itemsPurchaseReturnData[data.itemcode] = {}
            itemsPurchaseReturnData[data.itemcode]['itemcode'] = data.itemcode
            itemsPurchaseReturnData[data.itemcode]['product_name'] = data.product_name

            currentItem = data.itemcode

            $('#product_name').text(data.product_name)

        })
        .catch((err) => {
            console.log(err)
            alert("Itemcode Does Not Exist")
            $('#itemcode').focus()
        })
    }
})

            

$("#cost").on('keydown', function(event) {
    if(event.key === "Enter") {
        const costPrice = $(this).val().trim()
        itemsPurchaseReturnData[currentItem]['cost_price'] = costPrice
        $('#quantity').focus()
    }
})

$("#quantity").on('keydown', function(event) {
    if(event.key === "Enter") {
        const quantity = $(this).val().trim()
        itemsPurchaseReturnData[currentItem]['quantity'] = quantity
        $("#sale").focus()
        $("#ctotal").text(costTotal())
    }
})

$("#sale").on('keydown', function(event) {
    if(event.key === "Enter") {
        const salePrice = $(this).val().trim()
        itemsPurchaseReturnData[currentItem]['sale_price'] = salePrice
        $("#itemcode").focus()
        $("#stotal").text(saleTotal())

        if(itemsPurchaseReturnData[currentItem]) {
            $('#' + `${currentItem}`).remove()
        }
        createDynamicElement(itemsPurchaseReturnData[currentItem], $(".bill-area"), {quantity: itemsPurchaseReturnData[currentItem]['quantity'], purchaseMode: true})
    }
})

function costTotal() {
    let totalCost = 0
    
    for(let itemcode in itemsPurchaseReturnData) {
        totalCost += (Number(itemsPurchaseReturnData[itemcode]['cost_price']) * Number(itemsPurchaseReturnData[itemcode]['quantity']))
    }
    
    return totalCost
}

function saleTotal() {
    let totalSale = 0
    
    for(let itemcode in itemsPurchaseReturnData) {
        totalSale += (Number(itemsPurchaseReturnData[itemcode]['sale_price']) * Number(itemsPurchaseReturnData[itemcode]['quantity']))
    }
    
    return totalSale
}


$('#post').click(function () {
    for(let key in itemsPurchaseReturnData) {
        if(Object.keys(itemsPurchaseReturnData[key]).length < 5) {
            delete itemsPurchaseReturnData[key]
        }
    }


    postData('/purchase_return_history', {supplier: $('#suppliers').val(), purchaseReturnAmount: costTotal()})

    postData('/purchasereturn', {purchaseReturnData: itemsPurchaseReturnData})
    .then((data) => {
        $('#post').text(data.message)
    })
    .catch((err) => console.log(err))   
})

