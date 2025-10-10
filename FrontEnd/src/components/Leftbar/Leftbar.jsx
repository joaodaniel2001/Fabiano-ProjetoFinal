
import React, { useState } from 'react'
import './Leftbar.css'
import { IoMdHome } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { SlGraph } from "react-icons/sl";
import { HiIdentification } from "react-icons/hi";
import { BsFolder } from "react-icons/bs";

import { Link } from 'react-router-dom';

const LeftBar = () => {

    const [menu, setMenu] = useState('principal')

    const menuList = [
        { name: 'principal', label: 'Principal', icon: <IoMdHome size={20} />, to: '/' },
        { name: 'dados', label: 'Dados Pessoais', icon: <FaRegUser size={20} />, to: '/dados' },
        { name: 'desempenho', label: 'Desempenho', icon: <SlGraph size={20} />, to: '/desempenho' },
        { name: 'identificacao-estudantil', label: 'Identificação Estudantil', icon: <HiIdentification size={20} />, to: '/identificacao-estudantil' },
        { name: 'documentos', label: 'Documentos', icon: <BsFolder size={20} />, to: '/documentos' }
    ]

    return (
        <div className='leftbar'>
            <ul className="leftbar-menu">
                {menuList.map((item) => ( 
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
                ))}
            </ul>

        </div>
    )
}

export default LeftBar