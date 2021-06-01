import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import Button from 'components/Button/Button';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

import {logIn} from 'routes/LogIn/LogIn.module.scss';

const loginUrl = 'http://localhost:1337/auth/local';

const initialInputValue = {
    login: '',
    password: ''
}

const LogIn = () => {

    const [inputValue, setInputValue] = useState(initialInputValue);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const updateInputValue = (e) => {
        setInputValue({
            ...inputValue,
            [e.target.id]: e.target.value
        })
    }

    const verifyLoginForm =() => {
        if (inputValue.login === '' || inputValue.password === '') {
            setErrorMessage('You must provide all the information.')
            return false;
        } else {
            setErrorMessage('')
            return true;
        }
    }

    const logInHandler = (e) => {
        e.preventDefault();
        const isApproved = verifyLoginForm();
        if (isApproved) {
            axios.post(loginUrl, {
                identifier: inputValue.login,
                password: inputValue.password
            })
            .then(response => {
                console.log(response);
                setErrorMessage('');
                localStorage.setItem('token', response.data.jwt);
                localStorage.setItem('username', response.data.user.username);
                setIsLoggedIn(true);
            })
            .catch(error => {
                console.log(error.response);
                setErrorMessage(error.response.data.data[0].messages[0].message);
            })
        }
    }

    return(
        <form className={logIn}>
            <h2>Log In</h2>
            <label htmlFor="login">Login:</label>
            <input type="text" id="login" value={inputValue.login} onChange={updateInputValue} />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={inputValue.password} onChange={updateInputValue} />
            <ErrorMessage error={errorMessage} />
            <Button content="Log In" clickHandler={logInHandler} type="submit" />
            {isLoggedIn ? <Redirect to="/search" /> : null}
        </form>
    )
}

export default LogIn;