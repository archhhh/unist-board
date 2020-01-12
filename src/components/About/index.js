import React from 'react';

const About = () => {
    return (
        <div className='about'>
            <h2 id='about' className='about-header'>About us</h2>
            <p className='about-text' >group of students from unist trying not to make awful websites</p>
            <h2 id='contact' className='about-header'>Contact info</h2>
            <p className='about-text'>email: artychen13@unist.ac.kr <br /> telegram: t.me/artyomchen</p>
            <h2 id='contribute' className='about-header'>Contribute</h2>
            <p className='about-text'>if you want you can contribute to the project in two ways: < br/>1. devs can contribute on github.com/archhhh/unist-board <br /> 2. if you want to be a publisher or translator contact on telegram or by email</p>
        </div>
    );
}

export default About;