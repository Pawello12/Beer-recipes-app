import React from 'react';

import Button from 'components/Button/Button';

import {register} from 'routes/Register/Register.module.scss';

const Register = () => {
    return(
    <div className={register}>
        <h2>Create account</h2>
        <label htmlFor="login">Username:</label>
        <input type="text" id="login" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" />
        <label htmlFor="repeat-password">Repeat password:</label>
        <input type="password" id="repeat-password" />
        <Button content="Log In" />
    </div>
    )
}

export default Register;