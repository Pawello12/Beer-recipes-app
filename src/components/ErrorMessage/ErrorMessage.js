import React from 'react';

import {errorMessage} from 'components/ErrorMessage/ErrorMessage.module.scss';

const ErrorMessage = ({error, style}) => {
    return(
        <p className={errorMessage} style={style} >{error}</p>
    )
}

export default ErrorMessage;