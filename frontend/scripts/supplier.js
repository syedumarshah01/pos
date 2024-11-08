import { postData } from "./api.js"

const supplierData = {}

$('#suppliername').on('keydown', function(event) {
    if(event.key === 'Enter') {
        if(Number($(this).val())) return alert("Enter Correct Supplier Name")
        supplierData['supplier_name'] = $(this).val()
        $('#suppliercontact').focus()
    }
})

$('#suppliercontact').on('keydown', function(event) {
    if(event.key === 'Enter') {
        supplierData['supplier_contact'] = $(this).val()
    }
})

$('#post').on('click', function() {
    if(!(Object.keys(supplierData).length === 2)) return alert("Enter Full Data")
    postData('/addsupplier', supplierData)
    $('input').val(null)
})
