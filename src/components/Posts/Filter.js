import React from 'react';


const Filter = (props) => {
    return (
        <div className='filter'>
            <p className='name'>{props.name}</p>
            <div className='options'>
                <p 
                    onClick={() => props.toggleFilter()} 
                    className={props.isOpen ? 'current-option open' : 'current-option closed'}
                >
                    {props.options[props.selected]}
                </p>
                <ul className={props.isOpen ? 'options-list open' : 'options-list closed'}>
                    {
                        Object.keys(props.options).map( option => 
                            (
                                <li onClick={() => props.selectOption(option)}>
                                    {props.options[option]}
                                </li>
                            )
                        )
                    }
                </ul>
            </div>
        </div>
    );
};

export default Filter;