import React, { Component } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import Filter from './Filter';
import Post from './Post';


class Posts extends Component{
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            isLoading: true,
            searchValue: '',
            noMorePosts: false,
        }
    }
    
    componentDidMount = () => {
        this.updatePosts();
    };

    componentDidUpdate = (prevProps) => {
        if(prevProps.match.params.board != this.props.match.params.board){
            this.setState({searchValue: ''});
            this.props.selectOptionFilter('filter', 'all-time');
            this.updatePosts();
        }else if(prevProps.filter.selectedOption != this.props.filter.selectedOption || prevProps.sort.selectedOption != this.props.sort.selectedOption)
            this.updatePosts();
    }

    updatePosts = () => {
        this.setState({isLoading: true, posts: [], noMorePosts: false});
        this.scrollToTop();
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
        params.filter = this.props.filter.selectedOption;
        params.text = this.state.searchValue;
        params.startAt = this.state.posts.length;
        indexPosts(params)
        .then( result => {
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

    onChangeSearch = (e) => {
        if(this.searchTimeout)
            clearTimeout(this.searchTimeout);
        this.setState({searchValue: e.target.value});
        this.searchTimeout = setTimeout(this.updatePosts, 500);
    };

    scrollToTop = () => {
        if(window.scrollY > 0)  {
            window.scrollTo(0, window.scrollY - 150);
            window.requestAnimationFrame(this.scrollToTop);
        }
    };

    render(){
        return (
            <div className='posts'>
                <div className='scroll-to-top' onClick={this.scrollToTop}></div>
                <div className='main-content-wrapper'>
                    <div className='left'>
                        <input 
                            type='text' 
                            className='search' 
                            value={this.state.searchValue} 
                            onChange={this.onChangeSearch} 
                            placeholder={this.props.match.params.board ? `Search /${this.props.match.params.board}/` : `Search /all/`}
                        ></input>
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
                                options={
                                    {'today': 'Today', 
                                     'past-week': 'Past Week', 
                                     'past-month': 'Past Month', 
                                     'all-time': 'All Time'}
                                } 
                                selected={this.props.filter.selectedOption}
                                isOpen={this.props.filter.isOpen}
                                toggleFilter={() => this.props.toggleFilter('filter')}
                                selectOption={option => this.props.selectOptionFilter('filter', option)}
                            >
                            </Filter>
                        </div>
                        <div className='posts-list'>
                            {
                               !this.state.isLoading 
                               && this.state.posts.length == 0  
                               && <p className='no-posts'>no posts for you</p>
                            }
                            {this.state.posts.map( (post) => 
                                (<Post post={post}></Post>)
                            )}
                            {this.state.isLoading && <div class="lds-ring"><div></div><div></div><div></div><div></div></div>}  
                            { 
                               !this.state.isLoading 
                               && !this.state.noMorePosts
                               && <div className='load-more' onClick={this.loadPosts}>more</div>
                            }
                        </div>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        );
    }
};

export default Posts;