import React, { Component } from 'react';


class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            isNavClosed: false
        };
    }

    toggleNav = () => {
        this.setState({
            isNavClosed: !this.state.isNavClosed,
        });
    }


    render(){
        return (
            <header>
                <div className='left-header'>
                    <a className='logo' href='#'>
                        <img src='../../assets/logo.png'></img>
                    </a>
                    <nav>
                        <p className={this.state.isNavClosed ? 'current-board open' : 'current-board closed'} onClick={this.toggleNav}><span className='board-icon'>%icon%</span><span className='board-text'>/all/</span></p>
                        <ul className={this.state.isNavClosed ? 'boards open' : 'boards closed'}>
                            <li className='board all' value='all'><a href='#'><span className='board-icon'>%icon%</span><span className='board-text'>/all/</span></a></li>
                            <li className='board' value='all'><a href='#'><span className='board-icon'>%icon%</span><span className='board-text'>/dormitory/</span></a></li>
                            <li className='delimiter'></li>
                            <li className='footer'>
                                <div className='devs'>
                                    <p>For developers</p>
                                    <a href='https://github.com'>https://github.com</a>
                                    <p>For editors</p>
                                    <a href='https://t.me/comm_unist'>https://t.me/comm_unist</a>
                                </div>
                                <div className='info'>
                                    <a className='logo' href='#'>
                                        <img src='../../assets/logo.png'></img>
                                    </a>
                                    <ul>
                                        <li><a href='#'>About Us</a></li>
                                        <li><a href='#'>Contact</a></li>
                                        <li><a href='#'>Contribute</a></li>
                                    </ul>
                                    <p>Available Under MIT License. 2019</p>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>    
                <div className='right-header'>
                </div>
            </header>
        );
    }
};


export default Header;