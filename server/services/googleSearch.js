import axios from 'axios'
import * as cheerio from 'cheerio';
//need to setup pupeteer for headless browsing, accompanied with stealthPlugin and possibly chromium
//To be continued grabbing images from searches as well

//The image parsing portion seems to a base64 encrypted url, that is decoded by the browser.
//The google search page is dynamic, images cannot be extracted from the source html, and will to be pulled
// from the dom after rendered. Which should be able to be accomplished with pupeteer after that
//functionality is updated on the server.

//+${productName.split(" ").join("+")}

async function getFirstPage(query, productName) {
    let list;

    try {
        const res = await axios.get(`https://www.google.com/search?q=${query}`);
        const html = await res.data;
        const firstSearch = parseHTML(html);
        list = (firstSearch);
    }
    catch(e){
        console.log(e)
    }


    try {
        const res = await axios.get(`https://www.google.com/search?q=${query}+${productName.split(" ").join("+")}`);
        const html = await res.data;
        const secondSearch = parseHTML(html);
        for (let i = 0; i < secondSearch.length; i++)
        {
            list.push(secondSearch[i]);
        }
    }
    catch(e){
        console.log(e)
    }

    return list;
}

const parseHTML = (html) => {

        const $ = cheerio.load(html);
        const a = $('a');
        const h3 = [];
        const links = [];
        const images = [];

        a.each((i, aTag) => {
            const href = $(aTag).attr('href');
            if (href?.includes('/url?q=')) {
                const actualUrl = href.split('/url?q=')[1].split('&sa=U&')[0];
                links.push(actualUrl);
            }
        });

        const h3Tags = $('h3');
        h3Tags.each((i, h3Tag) => {
            const text = $(h3Tag).text().trim();
            h3.push(text);
        });

        const json = [];
        h3.forEach((h3, i) =>{
            json.push({title: h3, link: links[i], image: images[i]});
        });
        return json;
}


export {getFirstPage};