import React from 'react';
import { Link } from 'react-router-dom';
import Eyes from '../../../assets/eye1_3x.png';


const Post = (props) => {
    return (
        <div className='post'>
            <div className='views-counter'>
                <img src={Eyes}></img>
                {/*<p>{props.post.views}</p>*/}
            </div>
            <div className='content'>
                <div className='meta'>
                    <Link to={`/${props.post.meta.board}`} className='board'>/{props.post.meta.board}/</Link>
                    <span className='delimiter'></span>
                    <span className='date'>{props.post.meta.date.toString()}</span>
                </div>
                <div className='tags'>
                    {props.post.tags.map((tag) => (<span className='tag'>{tag}</span>))}
                </div>
                <div className='reactions'>                    
                </div>
                <Link to={`/${props.post.meta.board}/${props.post.id}`} className='title'>
                    {props.post.title}
                </Link>
                <div className='attachments'>
                    { props.post.attachments.length > 0 && <span className='clip'>📎 </span>}
                    { props.post.attachments.map((attachment, index) => {
                            return index == props.post.attachments.length - 1 
                            ? (<span><a href={attachment.url}>{attachment.name}</a></span>)
                            : (<span><a href={attachment.url}>{attachment.name}</a>| </span>)  
                    })}
                </div>
                <p className='short-desc' dangerouslySetInnerHTML={{ __html: props.post.short_desc }}></p>
                {/*<a href='#' className='comments'>comments 504</a>*/}
            </div>
        </div>
    );
}


export default Post;