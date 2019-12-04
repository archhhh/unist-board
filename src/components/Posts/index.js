import React, { Component } from 'react';
import Footer from '../Footer';
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
            }
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
                <div className='banner'>
                    <div className='content-wrapper'>
                        <h1 className='board-name'>%icon% /dormitory/</h1>
                        <h2 className='board-desc'>All things about dormitory.</h2>
                    </div>
                </div>
                <div className='main-content-wrapper'>
                    <div className='left'>
                        <input type='text' className='search' placeholder='Search /dormitory/'></input>
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
                            <Post
                                post={
                                    {
                                        views: 526,
                                        meta: {
                                            board: 'dormitory',
                                            date: '3 hours ago'
                                        },
                                        tags: ['application', 'winter semester'],
                                        title: 'Application for 2019 Winter Semester Student Residence',
                                        attachments: [{url: '#', name: 'info'}],
                                        short_desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget tincidunt felis. Nullam ornare sem sed dictum mattis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla tristique mi purus, in cursus ligula rhoncus tempus. Duis eget tempus dui. Etiam sollicitudin ex dictum semper iaculis.',
                                        comments: 504
                                    }
                                }
                            ></Post>
                            <Post
                                post={
                                    {
                                        views: 520,
                                        meta: {
                                            board: 'ece-school',
                                            date: '4 hours ago'
                                        },
                                        tags: ['research', 'lab'],
                                        title: 'ECE Lab Overview 9/23',
                                        attachments: [],
                                        short_desc: 'Greetings! This is ECE student council, ULRIM. We have prepared \'Lab Overview\' for undergrads.🐎 You can attain valuable information regarding research projects that you may be interested in.',
                                        comments: 502
                                    }
                                }
                            ></Post>
                            <div className='delimiter'></div>
                        </div>
                    </div>
                <Footer></Footer>
                </div>
            </div>
        );
    }
};

export default Posts;