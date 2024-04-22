const baseURL = process.env.NODE_ENV === "production" ? "/api" : "http://localhost:5000/api"


async function searchByName(parameter){
    try {
        const response = await fetch(`${baseURL}/search?productName=${parameter}`, {
        method: 'GET',
        headers: {"Content-Type": "application/json"},
    });
    if (response.ok) {
        return await response.json();
    }
    else {
        return null;
    }}
    catch(error){
        console.log(error);
    }
}


async function searchByUrl(parameter){
    try{
        const response = await fetch(`${baseURL}/search/url?url=${parameter}`, {
        method: 'GET',
        headers: {"Content-Type": "application/json"},
    });
    if (response.ok) {
        return await response.json();
    }
    else {
        return null;
    }}
    catch(error){
        console.log( error)
    }
}

async function selectionSearch(name, sku){
    try{
        const response = await fetch(`${baseURL}/search/selection?productName=${name}&sku=${sku}`, {
            method: 'GET',
            headers: {"Content-Type": "application/json"},
        });
    if (response.ok) {
        return await response.json();
    }
    else {
        return null;
    }}
    catch(error){
        console.log("Error in selection search", error)
    }
}


export { searchByName, searchByUrl, selectionSearch };