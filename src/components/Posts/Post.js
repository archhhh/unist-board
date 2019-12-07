import React from 'react';
import { Link } from 'react-router-dom';


const Post = (props) => {
    return (
        <div className='post'>
            <div className='views-counter'>
                <img src='../../assets/eye1_3x.png'></img>
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
                    {props.post.attachments.map((attachment) => (<a href={attachment.url}>{attachment.name}</a>))}
                </div>
                <p className='short-desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget tincidunt felis. 
Nullam ornare sem sed dictum mattis. Orci varius natoque penatibus et magnis dis 
parturient montes, nascetur ridiculus mus. Nulla tristique mi purus, in cursus ligula
rhoncus tempus. Duis eget tempus dui. Etiam sollicitudin ex dictum semper iaculis.</p>
                {/*<a href='#' className='comments'>comments 504</a>*/}
            </div>
        </div>
    );
}


export default Post;