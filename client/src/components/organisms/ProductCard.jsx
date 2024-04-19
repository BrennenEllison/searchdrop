import styles from './ProductCard.module.css';

const ProductCard = ({image, name, price, sku, action}) => {

    function testing(){
        action(name, sku);
    }

    return (
        <button onClick={testing}type='submit' className={styles.productBtn}>
        <div className={styles.cardContainer}>
            <div className={styles}>
                <img src={image} alt="product-image" height="200" width="200" className={styles.productImg} priority="false"/>
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.title}>
                    <h4>{name}</h4>
                </div>
                <div className={styles.priceContainer}>
                    <h6 className={styles.price}>${price}</h6>
                </div>
            </div>
        </div>
        </button>
    )
}

export default ProductCard;
