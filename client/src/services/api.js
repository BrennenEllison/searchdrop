const apiEndpoint = 'http://localhost:5000/api';

async function fetchHandler(select, search){
    let result;
    const selection = parseInt(select);
    // switch(selection){
    //     case 0:
    //         console.log("searching URL")
    //        // result = await searchByUrl(search);
    //     case 1:
    //         console.log("in da hole");
    //         //result = await searchByName(search);
    // }
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
        const response = await fetch(`${apiEndpoint}/search?productName=${parameter}`, {
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
        const response = await fetch(`${apiEndpoint}/search/url?url=${parameter}`, {
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



export {fetchHandler};