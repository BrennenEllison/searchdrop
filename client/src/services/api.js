const baseURL = process.env.NODE_ENV === "production" ? "/api" : "http://localhost:5000/api"

async function fetchHandler(select, search){
    let result;
    const selection = parseInt(select);
    if (selection == 0)
    {result = await searchByUrl(search);}
    else if(selection == 1)
    {result = await searchByName(search);}
    if(result){
        return result;
    }
    else {return null;}

}

async function searchByName(parameter){
    console.log(parameter)
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
        console.log("Error in api", error)
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


export {fetchHandler, searchByName, searchByUrl, selectionSearch };