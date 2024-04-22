import asyncHandler from 'express-async-handler'
import {getProductList, getListByID} from '../services/searchRequests.js';

import { getFirstPage } from '../services/googleSearch.js';

const nameSearchHandler = asyncHandler(async (req, res) => {
    const {productName} = req.query;
    let encoded = productName.replace(/ /g, '%20');
    const productList = await getProductList(encoded);
    const editedList = fixImageUrl(productList);
    res.json(editedList);
});

const selectionSearchHandler = asyncHandler(async (req,res) => {
    const {sku, productName} = req.query;
    const name = productName.replace(/-/g, '+');
    const shopList = await getFirstPage(sku, name);
    const editedList = validateUrl(shopList);

    if(editedList){
        res.json({listData: editedList});
    }
    else {
        res.json({title: "No Results Found"})
    }
});

const urlSearchHandler = asyncHandler(async (req, res) => {
    const {url} = req.query;
    let hostname;
    let id;
    let result;
    let shopList;

    const matches = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/);
    if (matches && matches.length > 1) {
    hostname = matches[1];
    }
    switch(hostname) {
        case "cjdropshipping.com":
            const match = url.match(/p-(\d+)\.html(?:\?.*)?$/); 
            const altMatch = url.match(/p-(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})\.html/);
            if(match){
                id = match[1];
                result = await getListByID(id)
            }
            else if(altMatch){
                id = altMatch[1];
                result = await getListByID(id)
            }
            else{
                console.log("Id not found");
            }
            break;
        default:
                console.log("No Matches found");
                break;
        }

    const getName = url.match(/\/product\/([^\/]+)-p-/);
    let productName = getName ? getName[1].replace(/-/g, '+') : null;

    if(result){
        const {data} = result;
        shopList = await getFirstPage(data.productSku, productName);
        const editedList = validateUrl(shopList);
        if (editedList){
            res.json({listData: editedList});
        }
    }
    else{
        res.json({title: "No Results Found"})
    }
});

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
            list[i].productImage = '/image_not_found.jpg';
        }

        switch(hostname){
            case "cc-west-usa.cjdropshipping.com":
                break;
            case "oss.cjdropshipping.com":
                break;
            case "oss-cf.cjdropshipping.com":
                break;
            case "cbu01.alicdn.com":
                break;
            case "cf.cjdropshipping.com":
                break;
            default:
                list[i].productImage = '/image_not_found.jpg';
        }
    }

    return list;
}

const validateUrl = (list) => {
    //confirm https
    const x = /^https:\/\//;
    //acceptable urls must include
    const regex = /\/(product|products|item|shop|itm)/;

    let r = [];
    
    if(list.length){
        for (let i = 0; i < list.length; i++) {
            if( x.test(list[i].link) && list[i].link.match(regex) ){
                r.push(list[i]);
            }
            else {
                const matches = list[i].link.match(hostnameRegex);
                const hostname = matches ? matches[1] : null;
                switch(hostname){
                    case null:
                        r.push(list[i]);
                    case "walmart.com":
                        r.push(list[i]);
                    case "amazon.com":
                        r.push(list[i]);
                    case "aliexpress.com":
                        r.push(list[i]);
                    default:
                        continue;
                }
            }
        }
    }
    return r;
}


export { nameSearchHandler, urlSearchHandler, selectionSearchHandler };