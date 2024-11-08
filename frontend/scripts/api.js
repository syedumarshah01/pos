const BASE_URL = 'http://localhost:3000'

export function fetchData(endpoint, data=null) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: BASE_URL + endpoint,
            type: data ? 'POST':'GET',
            data: data ? JSON.stringify(data) : data,
            contentType: 'application/json',
            success: function(data) {
                resolve(data)
            },
            error: function(xhr, status, error) {
                reject(error.message)
            }
        })
    })  
    
}


export function postData(endpoint, data) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: BASE_URL + endpoint,
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(data) {
                resolve(data)
            },
            error: function(xhr, status, error) {
                reject(error.message)
            }
        })
    })
}











