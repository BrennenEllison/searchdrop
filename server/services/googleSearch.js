import axios from 'axios'
import * as cheerio from 'cheerio';

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
            json.push({title: h3, link: links[i]});
        });
        return json;
}


export {getFirstPage};