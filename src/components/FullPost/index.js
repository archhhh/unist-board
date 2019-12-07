import React, { Component } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import { Link } from 'react-router-dom';
import Eyes from '../../../assets/eye1_3x.png';


class FullPost extends Component{
    constructor(props){
        super(props);
        this.state = {
            post: {
                id: '',
                views: 0,
                meta: {
                    board: '',
                    date: ''
                },
                tags: [],
                title: '',
                attachments: [],
                full_desc: '',
                comments: 0
            },
            isLoading: false,
            currentBoard: {
                name: 'all',
                description: '',
                icon: '',
            },
        };
    }

    updateCurrentBoard = () => {
        let currentBoard = {
            name: 'all',
            description: '',
            icon: '',
        };
        this.props.boards.forEach((board) => {
            if(board.id == this.props.match.params.board)
                currentBoard = board;
        });
        this.setState({currentBoard: currentBoard});
    }

    formatDate = (date) => {    
        let seconds = Math.ceil((new Date().getTime() - date.getTime())/1000);
        if(seconds < 60){
            if(seconds < 1)
                return 'now';
            else if(seconds == 1)
                return '1 second ago';
            else
                return `${seconds} seconds ago`;
        }
        let minutes = Math.ceil(seconds/60);
        if(minutes < 60)
            return minutes == 1 ? '1 minute ago' : `${minutes} minutes ago`;
        let hours = Math.ceil(minutes/60);
        if(hours < 24){
            return hours == 1 ? '1 hour ago' : `${hours} hours ago`;
        }
        let days = Math.ceil(hours/24);
        if(days < 365){
            return days == 1 ? '1 day ago' : `${days} days ago`;
        }
        let years =  Math.ceil(days/365);
        return years == 1 ? '1 year ago' : `${years} years ago`;
    }


    updatePost = () => {
        this.setState({isLoading: true});
        db.collection('posts').doc(this.props.match.params.post).get()
        .then(
            (post) => {
                this.setState(
                    {
                        post: {
                            id: post.id,
                            views: 0,
                            meta: {
                                board: post.data().board,
                                date: this.formatDate(post.data().timestamp.toDate())
                            },
                            tags: post.data().tags,
                            title: post.data().title,
                            attachments: post.data().attachments,
                            full_desc: post.data().full_desc,
                            comments: 0
                        },
                        isLoading: false
                    }
                );
            }
        ).catch(
            (error) => {
                this.setState(
                    {
                        post: {
                            id: '',
                            views: 0,
                            meta: {
                                board: '',
                                date: ''
                            },
                            tags: [],
                            title: '',
                            attachments: [],
                            full_desc: '',
                            comments: 0
                        },
                        isLoading: false,
                    }
                );
            }
        );
    }

    componentDidMount = () => {
        this.updateCurrentBoard();
        this.updatePost();
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.match.params.board != this.props.match.params.board || prevProps.boards != this.props.boards)
            this.updateCurrentBoard();
        if(prevProps.match.params.post != this.props.match.params.post)
            this.updatePost();
    }

    render(){
        return (
            <div className='full-post'>
                <Header boards={this.props.boards} currentBoard={this.state.currentBoard}></Header>
                <div className='banner'>
                        <div className='content-wrapper'>
                            <h1 className='board-name'>{this.state.currentBoard.icon} /{this.state.currentBoard.name}/</h1>
                            <h2 className='board-desc'>{this.state.currentBoard.description}</h2>
                        </div>
                    </div>
                <div className='main-content-wrapper'>
                    <div className='left'>
                        {this.state.isLoading 
                        ? <div class="lds-ring"><div></div><div></div><div></div><div></div></div> 
                        : (
                            <div className='post'>
                                <div className='views-counter'>
                                    <img src={Eyes}></img>
                                    {/*<p></p>*/}
                                </div>
                                <div className='content'>
                                    <div className='meta'>
                                        <Link to={`/${this.state.post.meta.board}`} className='board'>/{this.state.post.meta.board}/</Link>
                                        <span className='delimiter'></span>
                                        <span className='date'>{this.state.post.meta.date.toString()}</span>
                                    </div>
                                    <div className='tags'>
                                        {this.state.post.tags.map((tag) => (<span className='tag'>{tag}</span>))}
                                    </div>
                                    <div className='reactions'>                    
                                    </div>
                                    <h1 className='title'>
                                        {this.state.post.title}
                                    </h1>
                                    <div className='attachments'>
                                        { this.state.post.attachments.length > 0 && <span className='clip'>📎 </span>}
                                        { this.state.post.attachments.map((attachment) => (<a href={attachment.url}>{attachment.name}</a>))}
                                    </div>
                                    <p className='full-desc'> { this.state.post.full_desc }</p>
                                    {/*<p className='comments'>comments 504</p>*/}
                                </div>
                            </div>
                            )
                        } 
                        { !this.state.isLoading && <div className='delimiter'></div>}
                    </div>
                <Footer></Footer>
                </div>
            </div>
        );
    }
};

export default FullPost;