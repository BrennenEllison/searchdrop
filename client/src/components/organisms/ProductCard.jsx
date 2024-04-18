const ProductCard = ({image, name, price, sku, action}) => {


    return (
        <form action={action} className={styles.cardContainer}>
            <button type='submit'>
            <div className={styles}>
                <img src={image} alt="product-image" height="200" width="200" className={styles.productImg} priority="false"/>
            </div>
            <div className={styles.title}>
                <h4>{name}</h4>
            </div>
            <div >
                <h6 className={styles.price}>${price}</h6>
            </div>
            <input type="text" name="sku" readOnly={true} value={sku} className={styles.test} />
            <input type="text" name="productName" readOnly={true} value={name} className={styles.test} />
            </button>
        </form>
    )
}

export default ProductCard
