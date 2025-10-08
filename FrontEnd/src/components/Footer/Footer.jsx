
import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { BiLogoInstagramAlt } from "react-icons/bi";

const Footer = () => {

    const sesiList = [
        { label: 'facebook', link: 'https://www.facebook.com/SESIsc', icon: <FaFacebookF /> },
        { label: 'youtube', link: 'https://www.youtube.com/user/sesisantacatarina', icon: <FaYoutube /> },
        { label: 'twitter', link: 'https://x.com/SESIsc', icon: <FaXTwitter /> },
        { label: 'linkedin', link: 'https://www.linkedin.com/authwall?trk=bf&trkInfo=AQGSoIv-A-3ZDgAAAZnFVsCIAWZFVCxe2UBL7YHJMjpuYj-5UJ9jUJhikaLWnNP3JaTvu0eEYYKgzWXVAOHc-G9MIvN23eCMH_a3blzUaNm1WWz3lVxCDsyN8WCxPz6yksKke4U=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fcompany%2Fsesi-servi-o-social-da-ind-stria-sc', icon: <FaLinkedinIn /> },
        { label: 'instagram', link: 'https://www.instagram.com/accounts/login/?next=%2Fsesi.sc%2F&source=omni_redirect', icon: <BiLogoInstagramAlt /> }
    ]

    const footerList = [
        { label: 'Central de Ajuda', link: '/suporte' },
        { label: 'Contato', link: '/' },
        { label: 'Politica de privacidade', link: '/' }
    ]

    return (
        <div className='footer'>
            <div className="footer-sup">
                <div className="sesi">
                    <a href="https://sesisc.org.br/">
                        <img src={assets.sesi_white} alt="Logo sesi" />
                    </a>
                    <ul>
                        {sesiList.map((item) => {
                            <a href={item.link} key={item.label} target="_blank" rel="noopener noreferrer">
                                <li>{item.icon}</li>
                            </a>
                        })}
                    </ul>
                </div>
                <div className="senai">
                    <a href="https://sc.senai.br/">
                        <img src={assets.senai_white} alt="Logo senai" />
                    </a>
                </div>
            </div>
            <div className="footer-low">
                <p>Copyright ©2025 SENAI - Todos os direitos reservados</p>
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