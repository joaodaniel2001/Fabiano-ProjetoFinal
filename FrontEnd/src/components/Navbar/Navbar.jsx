
import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {
    
    const [menu, setMenu] = useState("home")

    return (
        <div className='navbar'>
            <img src={assets.logo} alt="Logo Senai" className='logo' />
            <ul className="navbar-menu">
                <li onClick={()=>setMenu("home")} className={menu==='home' ? 'active' : ''}>Página inicial</li>
                <li onClick={()=>setMenu("calendario")} className={menu==='calendario' ? 'active' : ''}>Calendário</li>
                <li onClick={()=>setMenu("aluno")} className={menu==='aluno' ? 'active' : ''}>Aluno</li>
                <li onClick={()=>setMenu("suporte")} className={menu==='suporte' ? 'active' : ''}>Falar com o suporte</li>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="pesquisa" className='icon' />
                <div className="navbar-search-icon">
                    <img src={assets.notification_icon} alt="notificacao" className='icon'/>
                    <div className="dot"></div>
                </div>
                <button>sing in</button>
            </div>
        </div>
    )
}

export default Navbar