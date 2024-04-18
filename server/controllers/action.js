import {getListByID, getProductList, getFirstPage} from '../services/searchRequests.js'

const searchHandler = async (prevState, formData) => {
    const {select, search} = req.body;
    //add error detection for form data here to prevent XSS

    // revalidatePath('/dropsearch');
    
    if(selection === 0){
        const shopList = await urlSearch(search);
        const editedList = validateUrl(shopList);
        //revalidatePath('/dropsearch');
        if(editedList){
            return {
                selection: selection,
                listData: editedList};
        }
        else {
            return {listData: [{
                title: "No Results Found",
                link: ""
            }]};
        }

    }
    else if(selection === 1){
        const list = await nameSearch(search);
        //revalidatePath('/dropsearch');
        const editedList = fixImageUrl(list);
        return {
            selection: selection,
            listData: editedList};
    }
}

const fromImage = async(prevState, formData) => {
    const sku = formData.get("sku");
    const name = formData.get("productName");
    const productName = name.replace(/-/g, '+');
    const shopList = await getFirstPage(sku, productName);
    const editedList = validateUrl(shopList);
        //revalidatePath('/dropsearch');
        if(editedList){
            return {
                selection: 0,
                listData: editedList};
        }
        else {
            return {listData: [{
                title: "No Results Found",
                link: ""
            }]};
        }
}

const urlSearch = async(search) => {
    const url = search;
    let hostname;
    let id;
    let result;
    let productName;

    const matches = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/);
    if (matches && matches.length > 1) {
    hostname = matches[1];
    }
    switch(hostname) {
        case "cjdropshipping.com":
            let matchFound = false;
            const match = url.match(/p-(\d+)\.html(?:\?.*)?$/); 
            if (match) {
                id = match[1];
                matchFound = true;
            }
            if (!matchFound){
                const altMatch = url.match(/p-(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})\.html/);
                if(altMatch) {
                    id = altMatch[1]
                    matchFound = true;
                }
            }
            if (matchFound){
                result = await getListByID(id)
            }
            else {
                console.log("no matches found for this website");
            }
            const getName = search.match(/\/product\/([^\/]+)-p-/);
            productName = getName ? getName[1].replace(/-/g, '+') : null;
            break;
        default: //will add additional websites when integration is available
            console.log("no match found");
    }

    if(result){
        // parse google search to find websites selling similar products
        //need to setup pupeteer for headless browsing, accompanied with stealthPlugin and possibly chromium
        //To be continued grabbing images from searches as well
        const {data} = result;
        const shopList = await getFirstPage(data.productSku, productName);
        return shopList;
    }
    else {
        console.log("no result found");
        return null;
    }
}

const nameSearch = async(search) => {
    let encoded = search.replace(/ /g, '%20');
    const productList = await getProductList(encoded);
    const {data} = productList;
    return data.list;
}

const fixImageUrl = (list) => {
    let url;
    let hostname;
    for(let i = 0; i < list.length; i++)
    {
        url = list[i].productImage;
        const matches = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/);
        if (matches && matches.length > 1) {
        hostname = matches[1];
        }
        else {
            console.log("no hostname specified");
            list[i].productImage = '/images/image_not_found.jpg';
        }

        //logic is dumb, maybe use switch case
        if(hostname == "cc-west-usa.cjdropshipping.com")
        {}
        else if(hostname == "oss.cjdropshipping.com")
        {}
        else {
            // console.log("host name not on list", hostname, "datatype:", typeof hostname);
            list[i].productImage = '/images/image_not_found.jpg';
        }
    }

    return list;
}

const validateUrl = (list) => {
    //confirm https
    const x = /^https:\/\//;
    //is a google maps url
    const y = /^https:\/\/maps\.google\.com/;
    // const z = /^(?:https?:\/\/).+/i;
    let r = [];
    

    //confirm https
    if(list.length){
        for (let i = 0; i < list.length; i++) {
            if((!y.test(list[i].link)) && x.test(list[i].link)){
                r.push(list[i]);
            }
        }
    }
    return r;
}


export {searchHandler, fromImage};
