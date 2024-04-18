

async function getImages(query, productName) {
    const res = await axios.get(`https://www.google.com/search?q=${productName}+${query.split(" ").join("+")}`);
    const html = await res.data;
    //console.log(html);
    const $ = cheerio.load(html);
    const a = $('a');
    const images = [];

    // Select all div elements with class .ez24df XNo5Ab OEaqif
    const divsWithClass = $('img.XNo5Ab');
    //console.log(divsWithClass);

    // Iterate over each div element with the class .ez24df
    divsWithClass.each((index, div) => {
        // Find all child img tags within the current div
        console.log($(div).attr('src'));

    });

    // console.log("searching images");
    // // const imageTags = $('div').filter('.uhHOwf');                 //.filter('.XNo5Ab');
    // // console.log(imageTags);
    //     const container = $('div.uhHOwf.ez24Df');

    //     container.each((i, div) => {
    //         const imgTags = $(div).find('img');
    //         console.log(`Image Tags >> ${imgTags}`)

    //         imgTags.each((i, img) => {
    //             console.log($(img).attr('src'))
    //         });
    //     })

        // const imageTags = $(div).has('img');
        // console.log(imageTags)
        // imageTags.each((i, img) => {
        //     const src = $(img).attr('src');
        //     console.log("Image Source Debug:", src);
        //     // const image = $(imageTag).text().trim();
        //     // images.push(src);
        // });


}







// (async () => {
//     const query = 'CJLS1489631';
//     const product = 'Solar+Resin+Owl+Decorative+Products+LED+Lights+Creative+Outdoor+Courtyard+Decoration+Gifts';
//     getImages(query, product);



//     // const firstPage = await getFirstPage(query, product)
//     // console.log(firstPage);


//     // const base64String = "data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
//     // var decodedBlob = decodeImage(base64String);

//     // var urlCreator = window.URL || window.webkitURL;
//     // var imageURL = urlCreator.createObjectURL(decodedBlob);
//     // document.querySelector("#image").src = imageURL;
    
//     // // You can use the decodedBlob object as needed, such as uploading it to a server or displaying it in the browser
//     // console.log(decodedBlob);
// })();
