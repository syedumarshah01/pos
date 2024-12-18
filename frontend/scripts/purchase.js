import { createDynamicElement } from "./pos.utils.js";
import { fetchData, postData } from "./api.js";

const itemsPurchaseData = {}
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
            itemsPurchaseData[data.itemcode] = {}
            itemsPurchaseData[data.itemcode]['itemcode'] = data.itemcode
            itemsPurchaseData[data.itemcode]['product_name'] = data.product_name

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
        itemsPurchaseData[currentItem]['cost_price'] = costPrice
        $('#quantity').focus()
    }
})

$("#quantity").on('keydown', function(event) {
    if(event.key === "Enter") {
        const quantity = $(this).val().trim()
        itemsPurchaseData[currentItem]['quantity'] = quantity
        $("#sale").focus()
        $("#ctotal").text(costTotal())
    }
})

$("#sale").on('keydown', function(event) {
    if(event.key === "Enter") {
        const salePrice = $(this).val().trim()
        itemsPurchaseData[currentItem]['sale_price'] = salePrice
        $("#itemcode").focus()
        $("#stotal").text(saleTotal())

        if(itemsPurchaseData[currentItem]) {
            $('#' + `${currentItem}`).remove()
        }
        createDynamicElement(itemsPurchaseData[currentItem], $(".bill-area"), {quantity: itemsPurchaseData[currentItem]['quantity'], purchaseMode: true})
    }
})

function costTotal() {
    let totalCost = 0
    
    for(let itemcode in itemsPurchaseData) {
        totalCost += (Number(itemsPurchaseData[itemcode]['cost_price']) * Number(itemsPurchaseData[itemcode]['quantity']))
    }
    
    return totalCost
}

function saleTotal() {
    let totalSale = 0
    
    for(let itemcode in itemsPurchaseData) {
        totalSale += (Number(itemsPurchaseData[itemcode]['sale_price']) * Number(itemsPurchaseData[itemcode]['quantity']))
    }
    
    return totalSale
}


$('#post').click(function () {
    for(let key in itemsPurchaseData) {
        if(Object.keys(itemsPurchaseData[key]).length < 5) {
            delete itemsPurchaseData[key]
        }
    }


    postData('/purchase_history', {supplier: $('#suppliers').val(), purchaseAmount: costTotal()})

    postData('/purchase', {purchaseData: itemsPurchaseData})
    .then((data) => {
        $('#post').text(data.message)
    })
    .catch((err) => console.log(err))   
})

