import React from 'react';
import { Link } from 'react-router-dom';


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
                    <Link className='logo' to='/'>
                        <img src='../../assets/logo.png'></img>
                    </Link>
                    <ul>
                        <li><a href='#'>About Us</a></li>
                        <li><a href='#'>Contact</a></li>
                        <li><a href='#'>Contribute</a></li>
                    </ul>
                </div>
                <p>Available Under MIT License. 2019</p>
            </div>
        </footer>
    );
};

export default Footer;