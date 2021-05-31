import React from 'react';

import {errorMessage} from 'components/ErrorMessage/ErrorMessage.module.scss';

const ErrorMessage = ({error}) => {
    return(
        <p className={errorMessage}>{error}</p>
    )
}

export default ErrorMessage;