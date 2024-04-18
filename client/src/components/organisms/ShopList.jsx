import Link from "next/link";

const ShopList = ({link, title}) => {
    return (
        <div className={styles.container}>
            <Link className={styles.link} target="_blank" href={link}>{title}</Link>
            <p>{link}</p>
        </div>
    )
}

export default ShopList