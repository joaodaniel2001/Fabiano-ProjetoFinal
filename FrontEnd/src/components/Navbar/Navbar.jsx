
import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { FaHome, FaUser, FaRegCalendar, FaSearch } from 'react-icons/fa';
import { BiSupport } from 'react-icons/bi';
import { MdNotifications } from "react-icons/md";

const Navbar = () => {

    const [menu, setMenu] = useState("home")
    const getIconColor = (menuName) => {
        return menu === menuName ? '#fff' : '#000'
    }
    const menuItems = [
        { name: 'home', label: 'Página Inicial', icon: <FaHome /> },
        { name: 'calendario', label: 'Calendário', icon: <FaRegCalendar /> },
        { name: 'aluno', label: 'Aluno', icon: <FaUser /> },
        { name: 'suporte', label: 'Falar com o suporte', icon: <BiSupport /> }
    ]

    return (
        <div className='navbar'>
            <img onClick={() => setMenu("home")} src={assets.logo} alt="Logo Senai" className='logo' />
            <ul className="navbar-menu">
                {/* Mapeando a lista e pegando os items */}
                {menuItems.map((item) => (
                    <li
                        key={item.name}
                        onClick={() => setMenu(item.name)}
                        className={menu === item.name ? 'active navbar-icon-text' : 'navbar-icon-text'}
                    >
                        <span>{item.icon}</span>{item.label}
                    </li>
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