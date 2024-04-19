import styles from './ShopList.module.css';

const ShopList = ({link, title}) => {
    return (
        <div className={styles.container}>
            <a className={styles.link} target="_blank" href={link}>{title}</a>
            <p className={styles.linkText}>{link}</p>
        </div>
    )
}

export default ShopList;