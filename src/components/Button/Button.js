import React from 'react';

import {button} from 'components/Button/Button.module.scss';

const Button = ({content, clickHandler}) => {
    return(
        <button className={button} onClick={clickHandler} >{content}</button>
    )
}

export default Button;