import styles from './ProductCard.module.css';

const ProductCard = ({image, name, price, sku, action}) => {

    function testing(){
        action(name, sku);
    }

    return (
        <div className={styles.cardContainer}>
            <button onClick={testing}type='submit'>
            <div className={styles}>
                <img src={image} alt="product-image" height="200" width="200" className={styles.productImg} priority="false"/>
            </div>
            <div className={styles.title}>
                <h4>{name}</h4>
            </div>
            <div >
                <h6 className={styles.price}>${price}</h6>
            </div>
            </button>
        </div>
    )
}

export default ProductCard;
