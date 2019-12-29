import React, { Component } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import Filter from './Filter';
import Post from './Post';


class Posts extends Component{
    constructor(props){
        super(props);
        this.state = {
            //sort: {
            //    isOpen: false,
            //    selectedOption: 'date',  
            //},
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
            searchValue: '',
            noMorePosts: false,
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
        this.setState({currentBoard: currentBoard, searchValue: '', filter: {isOpen:false, selectedOption: 'all-time'}});
    }
    
    updatePosts = () => {
        this.setState({isLoading: true, posts: []});
        setTimeout(this.loadPosts, 200);
    }

    loadPosts = () => {
        this.setState({isLoading: true});
        let params = {};
        let indexPosts = functions.httpsCallable('indexPosts');
        if(this.props.match.params.board != undefined && this.props.match.params.board != 'all')
            params.board = this.props.match.params.board;
        else
            params.board = 'all';
        params.filter = this.state.filter.selectedOption;
        params.text = this.state.searchValue;
        params.startAt = this.state.posts.length;
        console.log(params.startAt);
        indexPosts(params)
        .then( result => {
            console.log(result.data);
            if(result.data.length < 10)
                this.setState({
                    noMorePosts: true,
                });
            this.setState({
                posts: [...this.state.posts, ...result.data],
                isLoading: false
            });
        })
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
        if(prevProps.match.params.board != this.props.match.params.board || prevProps.boards != this.props.boards)
            this.updateCurrentBoard();
        if(prevProps.match.params.board != this.props.match.params.board)
            this.updatePosts();
    }

    toggleFilter = (filter) => {
        this.setState({
            [filter]: {
                ...this.state[filter],
                isOpen: !this.state[filter].isOpen, 
            }
        });
    }

    selectOption = (filter, option) => {
        this.setState({
            [filter]: {
                isOpen: false,
                selectedOption: option
            }
        });
        setTimeout(this.updatePosts, 100);
    }

    onChangeSearch = (e) => {
        if(this.searchTimeout)
            clearTimeout(this.searchTimeout);
        this.setState({searchValue: e.target.value});
        this.searchTimeout = setTimeout(this.updatePosts, 500);
    };


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
                        <input type='text' className='search' value={this.state.searchValue} onChange={this.onChangeSearch} placeholder={`Search /${this.state.currentBoard.name}/`}></input>
                        <div className='filters'>
                            { /*<Filter 
                                name='Sort' 
                                options={{'date': 'Date', 'comments': 'Comments', 'views': 'Views'}} 
                                selected={this.state.sort.selectedOption}
                                isOpen={this.state.sort.isOpen}
                                toggleFilter={(e) => this.toggleFilter('sort')}
                                //selectOption={}
                            ></Filter>
                            */}
                            <Filter 
                                name='Filter' 
                                options={{'today': 'Today', 'past-week': 'Past Week', 'past-month': 'Past Month', 'all-time': 'All Time'}} 
                                selected={this.state.filter.selectedOption}
                                isOpen={this.state.filter.isOpen}
                                toggleFilter={(e) => this.toggleFilter('filter')}
                                selectOption={option => this.selectOption('filter', option)}
                            >
                            </Filter>
                        </div>
                        <div className='posts-list'>
                            {!this.state.isLoading && this.state.posts.length == 0  &&<p className='no-posts'> :( </p>}
                            {this.state.posts.map( (post) => 
                                (<Post post={post}></Post>)
                            )}
                            {this.state.isLoading && <div class="lds-ring"><div></div><div></div><div></div><div></div></div>}  
                            { !this.state.isLoading && !this.state.noMorePosts && <div className='load-more' onClick={this.loadPosts}>more</div>}
                        </div>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        );
    }
};

export default Posts;