import React, { Component } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import Filter from './Filter';
import Post from './Post';


class Posts extends Component{
    constructor(props){
        super(props);
        this.state = {
            sort: {
                isOpen: false,
                selectedOption: 'date',  
            },
            filter: {
                isOpen: false,
                selectedOption: 'all-time',  
            },
            currentBoard: {
                name: 'all',
                description: '',
                icon: '',
            },
            posts: [],
            isLoading: true,
        }
    }
    
    updateCurrentBoard = () => {
        let currentBoard = {
            name: 'all',
            description: '',
            icon: '🌌',
        };
        this.props.boards.forEach((board) => {
            if(board.id == this.props.match.params.board)
                currentBoard = board;
        });
        this.setState({currentBoard: currentBoard});
    }

    updatePosts = () => {
        this.setState({isLoading: true, posts: []});
        let posts = [];
        let postsRef;
        if(this.props.match.params.board != undefined && this.props.match.params.board != 'all')
            postsRef = db.collection('posts').where('board', '==', this.props.match.params.board).orderBy('timestamp', 'desc');
        else
            postsRef = db.collection('posts').orderBy('timestamp', 'desc');
        postsRef.get()
        .then(
            (querySnapshot) => {
                querySnapshot.forEach(
                    (post) => {
                        posts.push(
                            {
                                id: post.id,
                                views: 0,
                                meta: {
                                    board: post.data().board,
                                    date: post.data().timestamp
                                },
                                tags: post.data().tags,
                                title: post.data().title,
                                attachments: post.data().attachments,
                                short_desc: post.data().short_desc,
                                comments: 0
                            }
                        );
                    }
                );
                this.setState({
                    posts: posts,
                    isLoading: false
                });
            }
        )
        .catch( 
            (error) => {
                console.log(error);
            }
        );
    }

    componentDidMount = () => {
        this.updateCurrentBoard();
        this.updatePosts();
    };

    componentDidUpdate = (prevProps) => {
        if(prevProps.match.params.board != this.props.match.params.board || prevProps.boards != this.props.boards){
            this.updateCurrentBoard();
            this.updatePosts();
        }
    }

    toggleFilter = (filter) => {
        this.setState({
            [filter]: {
                ...this.state[filter],
                isOpen: !this.state[filter].isOpen, 
            }
        });
    }


    render(){
        return (
            <div className='posts'>
                <Header boards={this.props.boards} currentBoard={this.state.currentBoard}></Header>
                { this.props.match.params.board != undefined && this.props.match.params.board != 'all' 
                && (
                    <div className='banner'>
                        <div className='content-wrapper'>
                            <h1 className='board-name'>{this.state.currentBoard.icon} /{this.state.currentBoard.name}/</h1>
                            <h2 className='board-desc'>{this.state.currentBoard.description}</h2>
                        </div>
                    </div>
                )}
                <div className='main-content-wrapper'>
                    <div className='left'>
                        <input type='text' className='search' placeholder={`Search /${this.state.currentBoard.name}/`}></input>
                        <div className='filters'>
                            <Filter 
                                name='Sort' 
                                options={{'date': 'Date', 'comments': 'Comments', 'views': 'Views'}} 
                                selected={this.state.sort.selectedOption}
                                isOpen={this.state.sort.isOpen}
                                toggleFilter={(e) => this.toggleFilter('sort')}
                                //selectOption={}
                            ></Filter>
                            <Filter 
                                name='Filter' 
                                options={{'today': 'Today', 'past-week': 'Past Week', 'past-month': 'Past Month', 'all-time': 'All Time'}} 
                                selected={this.state.filter.selectedOption}
                                isOpen={this.state.filter.isOpen}
                                toggleFilter={(e) => this.toggleFilter('filter')}
                                //selectOption={}
                            >
                            </Filter>
                        </div>
                        <div className='posts-list'>
                            {this.state.posts.map( (post) => 
                                (<Post post={post}></Post>)
                            )}
                            {this.state.isLoading && <div class="lds-ring"><div></div><div></div><div></div><div></div></div>}  
                            { !this.state.isLoading && <div className='delimiter'></div>}
                        </div>
                    </div>
                <Footer></Footer>
                </div>
            </div>
        );
    }
};

export default Posts;