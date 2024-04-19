import styles from './Spinner.module.css';

function Spinner() {
    return (
        <div>
        <div className={styles.ldsRing}><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Spinner
