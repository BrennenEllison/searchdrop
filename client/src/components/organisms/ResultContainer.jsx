import ProductCard from './ProductCard';
import ShopList from './ShopList';
import styles from './ResultContainer.module.css';


function ResultContainer({select, searchResult, productList, selectionList}) {

    async function submitHandler(name, sku){
        selectionList(name, sku);
    }


    if (select == 0 && searchResult.listData.length > 0)
    return (
        <div className={styles.searchResultContainer}>
            {searchResult.listData?.map((item) => (
                    <ShopList 
                    key={item.link}
                    link={item.link}
                    title={item.title}/>
                ))}
        </div>
    )
    else if (select == 1 && productList.length > 0)
    return (
        <div className={styles.productContainer}>
            {productList?.map((item) => (
                    <ProductCard 
                    key={item.productSku}
                    image={item.productImage}
                    name={item.productNameEn}
                    price={item.sellPrice}
                    sku={item.productSku}
                    action={submitHandler}
                    />
                    ))}
        </div>
    )
    else {
        return (
            <div className={styles.emptyContainer}>
                <div className={styles.emptyCard}>
                    <h1>No Results Found</h1>
                    <h3>Try searching for a different product</h3>
                    </div>

            </div>
        )
    }
}

export default ResultContainer
