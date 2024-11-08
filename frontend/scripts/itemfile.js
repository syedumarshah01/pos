import { fetchData, postData } from "./api.js"

const itemData = {}
let itemcodeAlreadyExist = false

$(document).ready(() => {
    // $('#itemcode').focus()
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

$('#itemcode').on('keydown', function(event) {
    if(event.key === 'Enter') {
        const itemcode = $(this).val()

        fetchData('/search', {itemcode: itemcode})
        .then((data) => {
            alert("Itemcode Already Exists")
            itemcodeAlreadyExist = true
            $('#itemname').val(data.product_name)
            $('#cost').val(data.cost_price)
            $('#sale').val(data.sale_price)

        })
        .catch((err) => {
            console.log(err)
            console.log("Itemcode Doesn't Exist")
        })


        itemData["itemcode"] = itemcode
        itemData['supplier'] = $('#suppliers').val()
        $('#itemname').focus()
    }
})

$('#itemname').on('keydown', function(event) {
    if(event.key === 'Enter') {
        const itemcode = $(this).val()
        itemData["itemname"] = itemcode
        $('#cost').focus()
    }
})


$('#cost').on('keydown', function(event) {
    if(event.key === 'Enter') {
        const costPrice = $(this).val()
        itemData['cost_price'] = costPrice
        $('#sale').focus()
    }
})

$('#sale').on('keydown', function(event) {
    if(event.key === 'Enter') {
        const salePrice = $(this).val()
        itemData['sale_price'] = salePrice
    }
})

// itemData['supplier'] = $('#suppliers').val() Won't work here because execution has reached here and suppliers' names hasn't been fetched yet (because of asynchronous function call fetchData()).

$('#additem').on('click', function(event) {
        
        if(!itemcodeAlreadyExist) {
            postData('/additem', itemData)
            .then(data => $('#additem').text(data.message))
            $('input').val(null)
        } else {
            postData('/updateitem', itemData)
            .then(data => $('#additem').text(data.message))

            itemcodeAlreadyExist = false
            $('input').val(null)
        }
    }
)
