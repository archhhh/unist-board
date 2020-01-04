import React, { Component } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import { Link } from 'react-router-dom';
import Eyes from '../../../assets/eye1_3x.png';
import { formatDate } from '../utilities';


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
        };
    }

    componentDidMount = () => {
        this.updatePost();
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.match.params.post != this.props.match.params.post)
            this.updatePost();
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
                                date: formatDate(post.data().timestamp.toDate())
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
                this.setState({isLoading: false});
                console.log(error);
            }
        );
    }


    render(){
        return (
            <div className='full-post'>
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
                                        { this.state.post.attachments.map((attachment, index) => {
                                            return index == this.state.post.attachments.length - 1 
                                            ? (<span><a href={attachment.url}>{attachment.name}</a></span>)
                                            : (<span><a href={attachment.url}>{attachment.name}</a>| </span>)  
                                        })}
                                    </div>
                                    <p className='full-desc' dangerouslySetInnerHTML={{ __html: this.state.post.full_desc }}></p>
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