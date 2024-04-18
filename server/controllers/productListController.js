import asyncHandler from 'express-async-handler'

const searchByName = asyncHandler(async(res,res)=>{
    const {sku, productName} = req.body;
    const name = productName.replace(/-/g, '+');
    const shopList = await getFirstPage(sku, productName);
    const editedList = validateUrl(shopList);

    if(editedList)
    {
        res.json()
    }
})