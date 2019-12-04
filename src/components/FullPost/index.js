import React, { Component } from 'react';
import Footer from '../Footer';


class FullPost extends Component{
    render(){
        return (
            <div className='full-post'>
                <div className='banner'>
                        <div className='content-wrapper'>
                            <h1 className='board-name'>%icon% /dormitory/</h1>
                            <h2 className='board-desc'>All things about dormitory.</h2>
                        </div>
                    </div>
                <div className='main-content-wrapper'>
                    
                    <div className='left'>
                        <div className='post'>
                                <div className='views-counter'>
                                    <img src='../../assets/eye1_3x.png'></img>
                                    <p>526</p>
                                </div>
                                <div className='content'>
                                    <div className='meta'>
                                        <a href='#' className='board'>/dormitory/</a>
                                        <span className='delimiter'></span>
                                        <span className='date'>3 hours ago</span>
                                    </div>
                                    <div className='tags'>
                                        {['application', 'winter semester'].map((tag) => (<span className='tag'>{tag}</span>))}
                                    </div>
                                    <div className='reactions'>                    
                                    </div>
                                    <h1 className='title'>
                                        Application for 2019 Winter Semester Student Residence
                                    </h1>
                                    <div className='attachments'>
                                        { [{url: '#', name: 'info'}].length > 0 && <span className='clip'>📎 </span>}
                                        {[{url: '#', name: 'info'}].map((attachment) => (<a href={attachment.url}>{attachment.name}</a>))}
                                    </div>
                                    <p className='full-desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget tincidunt felis. 
                    Nullam ornare sem sed dictum mattis. Orci varius natoque penatibus et magnis dis 
                    parturient montes, nascetur ridiculus mus. Nulla tristique mi purus, in cursus ligula
                    rhoncus tempus. Duis eget tempus dui. Etiam sollicitudin ex dictum semper iaculis.</p>
                                    <p className='comments'>comments 504</p>
                                </div>
                        </div>
                        <div className='delimiter'></div>
                    </div>
                <Footer></Footer>
                </div>
            </div>
        );
    }
};

export default FullPost;