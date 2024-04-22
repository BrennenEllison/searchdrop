import { Link } from 'react-router-dom';
import styles from './navbar.module.css';

function Navbar() {
    return (
        <div className={styles.navContainer}>
            <ul className={styles.nav}>
                <li><Link to={'/Home'} className={styles.link}>Home</Link></li>
                <li><Link to={'/dropsearch'} className={styles.link}>DropSearch</Link>DropSearch</li>
            </ul>
        </div>
    )
}

export default Navbar;
