import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';


class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            boards: [],
            isLoading: false,
            currentBoard: {
                id: 'all',
                name: 'all',
                description: '',
                icon: '🌌',
            }
        };
    }
    componentDidMount = () => {
        let boards = [];
        let currentBoard = {
            id: 'all',
            name: 'all',
            description: '',
            icon: '🌌',
        };
        this.setState({isLoading: true});
        let path = this.props.location.pathname.slice(1).split('/')[0];
        db.collection('boards').get()
        .then(
            (querySnapshot) => {
                querySnapshot.forEach(
                    (doc) => {
                        boards.push(
                            {
                                id: doc.id,
                                icon: doc.data().icon,
                                name: doc.data().name,
                                description: doc.data().description
                            }
                        );
                        if(doc.id == path)
                            currentBoard = boards[boards.length-1];
                    }
                );
                this.setState({boards, currentBoard, isLoading: false});
            }
        )
        .catch( 
            (error) => {
                console.log(error);
            }
        );
    }

    componentDidUpdate = (prevProps) => {
        let currentBoard = {
            id: 'all',
            name: 'all',
            description: '',
            icon: '🌌',
        };
        if(prevProps.location.pathname != this.props.location.pathname){
            let path = this.props.location.pathname.slice(1).split('/')[0];
            this.state.boards.forEach( board => {
                if(board.id == path)
                    currentBoard = board;
            });
            this.setState({currentBoard});
        }
    }

    render(){
        return (
            <div>
                <header>
                    {this.state.isLoading && <div className='loading'></div>} 
                    <div className='header-wrapper'>
                        <div className='left-header'>
                            <a className='logo' href='/'>
                                <img src={Logo}></img>
                            </a>
                            <nav>
                                <p 
                                    className={!this.props.isNavClosed ? 'current-board open' : 'current-board closed'} 
                                >
                                    <span className='board-icon'>
                                        {this.state.currentBoard.icon}
                                    </span>
                                    <span className='board-name'>
                                        /{this.state.currentBoard.name}/
                                    </span>
                                </p>
                                <ul 
                                    className={!this.props.isNavClosed ? 'boards open' : 'boards closed'} 
                                > 
                                    <li className='board all'>
                                        <Link to='/all'>
                                            <span className='board-icon'>🌌</span>
                                            <span className='board-name'>/all/</span>
                                        </Link>
                                    </li>
                                    {  
                                        this.state.boards.map( board => 
                                            (
                                                <li className='board'>
                                                    <Link to={`/${board.id}`}>
                                                        <span className='board-icon'>{board.icon}</span>
                                                        <span className='board-name'>/{board.name}/</span>
                                                    </Link>
                                                </li>
                                            )
                                        )
                                    }
                                    <li className='delimiter'></li>
                                    <li className='footer'>
                                        <div className='devs'>
                                            <p>For developers</p>
                                            <a href='https://github.com/archhhh/unist-board'>github</a>
                                            <p>For editors</p>
                                            <a href='https://t.me/comm_unist'>t.me</a>
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
                        <div className='right-header'>
                        </div> 
                    </div>
                </header>
                { this.state.currentBoard.id != 'all'
                    && (
                        <div className='banner'>
                            <div className='content-wrapper'>
                                <h1 className='board-name'>{this.state.currentBoard.icon} /{this.state.currentBoard.name}/</h1>
                                <h2 className='board-desc'>{this.state.currentBoard.description}</h2>
                            </div>
                        </div>
                )}
            </div>
        );
    }
};


export default Header;