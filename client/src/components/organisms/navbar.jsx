import React from 'react'
import Button from '../atoms/button.jsx'
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div>
            <ul>
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
