import React from 'react';

import {button} from 'components/Button/Button.module.scss';

const Button = ({content, clickHandler, style, type, submitHandler, beerIndex}) => {
    return(
        <button className={button} onClick={clickHandler} style={style} type={type} onSubmit={submitHandler} beerIndex={beerIndex} >{content}</button>
    )
}

export default Button;