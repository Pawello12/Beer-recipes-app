import React, { useState } from 'react';

import Button from 'components/Button/Button';

import {logIn} from 'routes/LogIn/LogIn.module.scss';

const initialInputValue = {
    login: '',
    password: ''
}

const LogIn = () => {

    const [inputValue, setInputValue] = useState(initialInputValue);

    const updateInputValue = (e) => {
        setInputValue({
            ...inputValue,
            [e.target.id]: e.target.value
        })
    }

    const verifyLoginForm =() => {

    }

    return(
        <form className={logIn}>
            <h2>Log In</h2>
            <label htmlFor="login">Login:</label>
            <input type="text" id="login" value={inputValue.login} onChange={updateInputValue} />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={inputValue.password} onChange={updateInputValue} />
            <Button content="Log In" type="submit" />
        </form>
    )
}

export default LogIn;