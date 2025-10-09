
import React, { useState } from 'react'
import './Leftbar.css'
import { IoMdHome } from "react-icons/io"; 
import { FaRegUser } from "react-icons/fa";

import { Link } from 'react-router-dom';

const LeftBar = () => {

    const [menu, setMenu] = useState('/')

    const getColor = (menuName) => {
        return menu === menuName ? '#0047B6' : '#606060'
    }

    const menuList = [
        { name: 'pricipal', label: 'Principal', icon: <IoMdHome />, to: '/' },
        { name: 'dados', label: 'Dados Pessoais', icon: <FaRegUser />, to: '/dados' },
        { name: 'desempenho', label: 'Desempenho', icon: <IoMdHome />, to: '/desempenho' },
        { name: 'identificacao-estudantil', label: 'Identificação Estudantil', icon: <IoMdHome />, to: '/identificacao-estudantil' },
        { name: 'documentos', label: 'Documentos', icon: <IoMdHome />, to: '/documentos' }
    ]

    return (
        <div className='leftbar'>
            <ul className="leftbar-menu">
                {menuList.map((item) => {
                    return (
                        <Link to={item.to}
                            key={item.name}
                            onClick={() => setMenu(item.name)}
                            className={`leftbar-icon-text ${menu === item.name ? 'active' : ''}`}
                        >
                            <span>
                                {item.icon}
                            </span>
                            <span className='leftbar-label'>
                                {item.label}
                            </span>
                        </Link>
                    )
                })}
            </ul>

        </div>
    )
}

export default LeftBar