import axios from 'axios';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';
dotenv.config();

const token = process.env.ACCESS_TOKEN 

/*Searches the API for list of products by a given name*/
//Not very accurate
async function getProductList(productName){
    try {
        const response = await axios.get(`https://developers.cjdropshipping.com/api2.0/v1/product/list?productNameEn=${productName}&pageSize=20`, {
            headers:{
                'Content-Type': 'application-json',
                'CJ-Access-Token': `${token}`
            }
        });
        return response.data.data.list;
    }
    catch(e){   
        console.log(e);
    }
}

/*Searhces the API for product information given the products CJDropshipping ID #*/
//Not very accurate
async function getListByID(id){
    try {
        const response = await axios.get(`https://developers.cjdropshipping.com/api2.0/v1/product/query?pid=${id}`, {
            headers:{
                'Content-Type': 'application-json',
                'CJ-Access-Token': `${token}`
            }
        });
        return response.data;
    }
    catch(e){   
        console.log(e);
    }
}

/*--Parses Google Search results for the related data.--*/

//Not very accurate :(
async function getFirstPage(query, productName) {
    try {
        const res = await axios.get(`https://www.google.com/search?q=${productName}+${query.split(" ").join("+")}`, {
            method: 'GET',
            cache: 'no-store'});

        const html = await res.text();

        const $ = cheerio.load(html);
        const a = $('a');
        const h3 = [];
        const links = [];
        //const images = [];

        a.each((i, aTag) => {
            const href = $(aTag).attr('href');
            if (href?.includes('/url?q=')) {
                const actualUrl = href.split('/url?q=')[1].split('&sa=U&')[0];
                links.push(actualUrl);
            }
        });

        //!! The bellow code will eventually be optimized for collecting google images to display to the page.

        // const imageTags = $('img');
        // imageTags.each((i, imageTag) => {
        //     const src = $(imageTag).attr('src');
        //     //const image = $(imageTag).text().trim();
        //     images.push(src);
        // });

        const h3Tags = $('h3');
        h3Tags.each((i, h3Tag) => {
            const text = $(h3Tag).text().trim();
            h3.push(text);
        });

        const json = [];
        h3.forEach((h3, i) =>{
            json.push({title: h3, link: links[i]});
        });
        return json;

    }
    catch(e){
        console.log(e)
    }
}

export {getProductList, getListByID, getFirstPage};
