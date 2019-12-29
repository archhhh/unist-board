import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';

const Footer = () => {
    return (
        <footer>
            <div className='devs'>
                <p>For developers</p>
                <a href='https://github.com/'>https://github.com/</a>
                <p>For editors</p>
                <a href='https://t.me/comm_unist'>https://t.me/comm_unist</a>
            </div>    
            <div className='info'>
                <div className='sitemap'>
                    <a className='logo' href='/'>
                        <img src={Logo}></img>
                    </a>
                    <ul>
                        <li><Link to='/about'>About Us</Link></li>
                        <li><Link to='/about'>Contact</Link></li>
                        <li><Link to='/about'>Contribute</Link></li>
                    </ul>
                </div>
                <p>Available Under MIT License. 2019</p>
            </div>
        </footer>
    );
};

export default Footer;