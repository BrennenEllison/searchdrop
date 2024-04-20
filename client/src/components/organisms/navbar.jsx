import React from 'react'
import Button from '../atoms/button.jsx'
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';

function Navbar() {
    return (
        <div className={styles.navContainer}>
            <ul className={styles.nav}>
                <li><Link to={'/Home'}>Home</Link></li>
                <li>Contact</li>
            </ul>
            <div>
                <Button />
            </div>
        </div>
    )
}

export default Navbar;
