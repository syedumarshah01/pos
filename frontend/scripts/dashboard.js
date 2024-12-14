import { fetchData } from "./api.js";

fetchData('/totalsale')
.then((data) => {
    $('#today-sale').text(data)
})
.catch((err) => {
    console.log(err)
})


fetchData('/totalpurchase')
.then((data) => {
    $('#today-purchases').text(data)
})
.catch((err) => {
    console.log(err)
})

fetchData('/totalpurchasereturn')
.then((data) => {
    $('#today-purchase-returns').text(data)
})
.catch((err) => {
    console.log(err)
})