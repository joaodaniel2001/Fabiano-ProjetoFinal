
import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { BiLogoInstagramAlt } from "react-icons/bi";

const Footer = () => {

    const sesiList = [
        { link: 'https://www.facebook.com/SESIsc', icon: <FaFacebookF size={15} /> },
        { link: 'https://www.youtube.com/user/sesisantacatarina', icon: <FaYoutube size={15} /> },
        { link: 'https://x.com/SESIsc', icon: <FaXTwitter size={15} /> },
        { link: 'https://www.linkedin.com/company/sesisc/', icon: <FaLinkedinIn size={15} /> },
        { link: 'https://www.instagram.com/accounts/login/?next=%2Fsesi.sc%2F&source=omni_redirect', icon: <BiLogoInstagramAlt size={15} /> }
    ]

    const senaiList = [
        { link: 'https://www.facebook.com/senaisc?checkpoint_src=1501092823525282', icon: <FaFacebookF size={15} /> },
        { link: 'https://www.youtube.com/user/conhecimentoamais', icon: <FaYoutube size={15} /> },
        { link: 'https://x.com/SENAISC', icon: <FaXTwitter size={15} /> },
        { link: 'https://www.linkedin.com/company/senai-sc---servi-o-nacional-de-aprendizagem-industrial?_l=pt_BR', icon: <FaLinkedinIn size={15} /> },
        { link: 'https://www.instagram.com/senai.sc/', icon: <BiLogoInstagramAlt size={15} /> }
    ]

    const footerList = [
        { label: 'Central de Ajuda', link: '/suporte' },
        { label: 'Contato', link: '/' },
        { label: 'Politica de privacidade', link: '/' }
    ]

    return (
        <div className='footer'>
            <div className="footer-sup">
                <div className="sesi-senai">
                    <a href="https://sesisc.org.br/">
                        <img src={assets.sesi_white} alt="Logo sesi" />
                    </a>
                    <ul>
                        {sesiList.map((item) => {
                            return (
                                <a href={item.link}>
                                    <li>{item.icon}</li>
                                </a>
                            )
                        })}
                    </ul>
                </div>
                <div className="sesi-senai">
                    <a href="https://sc.senai.br/">
                        <img src={assets.senai_white} alt="Logo senai" />
                    </a>
                    <ul>
                        {senaiList.map((item) => {
                            return (
                                <a href={item.link}>
                                    <li>{item.icon}</li>
                                </a>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div className="footer-low">
                <p>Copyright ©2025 Cabecinha - Todos os direitos reservados</p>
                <ul>
                    {footerList.map((item) => (
                        <NavLink key={item.link}>
                            <li>{item.label}</li>
                        </NavLink>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Footer