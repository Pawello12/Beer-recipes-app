import React from 'react';

import Button from 'components/Button/Button';

import {logIn} from 'routes/LogIn/LogIn.module.scss';

const LogIn = () => {
    return(
        <div className={logIn}>
            <h2>Log In</h2>
            <label htmlFor="login">Login:</label>
            <input type="text" id="login" />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" />
            <Button content="Log In" />
        </div>
    )
}

export default LogIn;