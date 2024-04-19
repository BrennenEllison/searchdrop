import ProductCard from './ProductCard';
import ShopList from './ShopList';
import styles from './ResultContainer.module.css';


function ResultContainer({select, searchResult, productList, selectionList}) {

    async function submitHandler(name, sku){
        selectionList(name, sku);
    }

    if (select == 0)
    return (
        <div>
            {searchResult.listData?.map((item) => (
                    <ShopList 
                    key={item.title}
                    link={item.link}
                    title={item.title}/>
                ))}
        </div>
    )

    if (select == 1)
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
}

export default ResultContainer
