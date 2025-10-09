import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';
import { MdNotifications } from "react-icons/md";

const Navbar = () => {

    return (
        <div className='navbar'>
            <Link to='/'>
                <img src={assets.logo} alt="Logo Senai" className='logo' />
            </Link>

            <ul className="navbar-menu">
                
            </ul>
            <div className="navbar-right">
                <div className="navbar-search-icon">
                    <MdNotifications size='1.8em' />
                    <div className="dot"></div>
                </div>
                <button>sing in</button>
            </div>
        </div>
    )
}

export default Navbar