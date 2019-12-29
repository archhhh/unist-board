import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';


class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            isNavClosed: false,
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
                <div className='header-wrapper'>
                    <div className='left-header'>
                        <a className='logo' href='/'>
                            <img src={Logo}></img>
                        </a>
                        <nav>
                            <p className={this.state.isNavClosed ? 'current-board open' : 'current-board closed'} onClick={this.toggleNav}><span className='board-icon'>{this.props.currentBoard.icon}</span><span className='board-name'>/{this.props.currentBoard.name}/</span></p>
                            <ul className={this.state.isNavClosed ? 'boards open' : 'boards closed'} onClick={this.toggleNav}> 
                                <li className='board all'><Link to='/all'><span className='board-icon'>🌌</span><span className='board-name'>/all/</span></Link></li>
                                {this.props.boards.map( (board) => (<li className='board'><Link to={`/${board.id}`}><span className='board-icon'>{board.icon}</span><span className='board-name'>/{board.name}/</span></Link></li>))}
                                <li className='delimiter'></li>
                                <li className='footer'>
                                    <div className='devs'>
                                        <p>For developers</p>
                                        <a href='https://github.com'>https://github.com</a>
                                        <p>For editors</p>
                                        <a href='https://t.me/comm_unist'>https://t.me/comm_unist</a>
                                    </div>
                                    <div className='info'>
                                        <a className='logo' href='/'>
                                            <img src={Logo}></img>
                                        </a>
                                        <ul>
                                        <li><Link to='/about'>About Us</Link></li>
                                        <li><Link to='/about'>Contact</Link></li>
                                        <li><Link to='/about'>Contribute</Link></li>
                                        </ul>
                                        <p>Available Under MIT License. 2019</p>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </div>   
                </div>
                <div className='right-header'>
                </div>
            </header>
        );
    }
};


export default Header;