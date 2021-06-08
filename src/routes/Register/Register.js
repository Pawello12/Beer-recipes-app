import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { useStateIfMounted } from 'use-state-if-mounted';

import Button from 'components/Button/Button';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import LoggedUserContext from 'context/LoggedUserContext';

import {register, info} from 'routes/Register/Register.module.scss';

const registerUrl = 'https://beer-recipes-app-backend.herokuapp.com/auth/local/register';

const initialInputsValue = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
}

const Register = () => {

    const [registerInputs, setRegisterInputs] = useStateIfMounted(initialInputsValue)
    const [errorMessage, setErrorMessage] = useState('');
    const [redistered, setRegistered] = useState(false);

    const UserContext = useContext(LoggedUserContext);

    const verifyRegisterForm = () => {
        if (registerInputs.username === '' || registerInputs.password === '' || registerInputs.confirmPassword === '') {
            setErrorMessage('You must provide all the information.')
            return false;
        }else if (registerInputs.password !== registerInputs.confirmPassword) {
            setErrorMessage('Passwords must be the same.');
            return false;
        } else if (!registerInputs.email.includes('@')) {
            setErrorMessage('Yoy must enter vaild email.');
            return false;
        } else if (registerInputs.username.length < 5) {
            setErrorMessage('Username must contain at least 5 characters.');
            return false;
        } else if (registerInputs.password.length < 8) {
            setErrorMessage('Password must contain at least 8 characters.');
            return false;
        } else if (registerInputs.password.match(/[a-z]/g) === null) {
            setErrorMessage('Password must contain at least 1 lowercase letter.');
            return false;
        } else if (registerInputs.password.match(/[A-Z]/g) === null) {
            setErrorMessage('Password must contain at least 1 uppercase letter.');
            return false;
        } else if (registerInputs.password.match(/\d/gm) === null) {
            setErrorMessage('Password must contain at least 1 digit.');
            return false;
        } else {
            setErrorMessage('');
            return true;
        }
    }

    const sendNewUser = (e) => {
        e.preventDefault();
        const isApproved = verifyRegisterForm();
        if (isApproved) {
        axios
            .post(registerUrl, {
                username: registerInputs.username,
                email: registerInputs.email,
                password: registerInputs.password
            })
            .then(response => {
                setErrorMessage('');
                setRegisterInputs(initialInputsValue)
                // console.log('User profile', response.data.user);
                // console.log('User token', response.data.jwt);
                // console.log(response);

                localStorage.setItem('token', response.data.jwt);
                localStorage.setItem('username', response.data.user.username);
                UserContext.setUser({
                    isUserLoggedIn: true,
                    userName: response.data.user.username,
                    token: response.data.jwt
                })
                setRegistered(true);

            })
            .catch(error => {
                console.log('An error occurred:', error.response);
                setErrorMessage(error.response.data.message[0].messages[0].message);
                console.log(error.response.data.message[0].messages[0].message)
            })
        }
    }

    const inputChangeHandler = (e) => {

        setRegisterInputs({
            ...registerInputs,
            [e.target.id]: e.target.value
        })
    }

    return(
        <>
    <form className={register}>
        <h2>Create account</h2>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" onChange={inputChangeHandler} value={registerInputs.username} />
        <label htmlFor="email">E-mail:</label>
        <input type="email" id="email" onChange={inputChangeHandler} value={registerInputs.email} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" onChange={inputChangeHandler} value={registerInputs.password} />
        <label htmlFor="confirmPassword">Repeat password:</label>
        <input type="password" id="confirmPassword" onChange={inputChangeHandler} value={registerInputs.confirmPassword} />
        <ErrorMessage error={errorMessage} />
        <Button content="Register" clickHandler={sendNewUser} type="submit" />
        {redistered ? <Redirect to="/search" /> : null}
        {UserContext.user.isUserLoggedIn ? <Redirect to="/search" /> : null}
    </form>
    <p className={info} >When the app is idle for a while, the backend API goes to sleep because of the free plan on Heroku. It then needs a moment to start working again. Therefore, the first login attempts may wait a little longer for a response.</p>
    </>
    )
}

export default Register;