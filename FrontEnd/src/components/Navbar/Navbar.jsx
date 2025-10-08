import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { NavLink, Link } from 'react-router-dom';
import { FaHome, FaUser, FaRegCalendar, FaSearch } from 'react-icons/fa';
import { BiSupport } from 'react-icons/bi';
import { MdNotifications } from "react-icons/md";

const Navbar = () => {

    const menuItems = [
        { name: 'home', label: 'Página Inicial', icon: <FaHome />, to: '/' },
        { name: 'calendario', label: 'Calendário', icon: <FaRegCalendar />, to: '/calendario' },
        { name: 'aluno', label: 'Aluno', icon: <FaUser />, to: '/aluno' },
        { name: 'suporte', label: 'Falar com o suporte', icon: <BiSupport />, to: '/suporte' }
    ]

    return (
        <div className='navbar'>
            <Link to="/">
                <img src={assets.logo} alt="Logo Senai" className='logo' />
            </Link>

            <ul className="navbar-menu">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.to}
                        className={({ isActive }) =>
                            isActive ? 'active' : ''
                        }
                    >
                        <span>{item.icon}</span>{item.label}
                    </NavLink>
                ))}
            </ul>
            <div className="navbar-right">
                <FaSearch size='1.4em' />
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