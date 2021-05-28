import React from 'react';

import {button} from 'components/Button/Button.module.scss';

const Button = ({content}) => {
    return(
        <button className={button}>{content}</button>
    )
}

export default Button;