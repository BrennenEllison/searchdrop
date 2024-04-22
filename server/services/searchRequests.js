import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const token = process.env.ACCESS_TOKEN;

/*Searches the API for list of products by a given name*/
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

export {getProductList, getListByID};
