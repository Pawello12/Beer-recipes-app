import React from 'react';

import {button} from 'components/Button/Button.module.scss';

const Button = ({content, clickHandler, style}) => {
    return(
        <button className={button} onClick={clickHandler} style={style} >{content}</button>
    )
}

export default Button;