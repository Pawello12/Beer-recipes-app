import React from 'react';
import {NavLink} from 'react-router-dom';

import Button from 'components/Button/Button';

import { home, name, description } from './Home.module.scss';

const Home = () => {
    return (
        <div className={home}>
            <h1 className={name}>Beer Recipes App</h1>
            <p className={description}>Log in to add recipes to your favourite.</p>
            <NavLink to="login" ><Button content="Log in" /></NavLink>
            <NavLink to="register" ><Button content="Create account" /></NavLink>
            <NavLink to="search" ><Button content="Stay logged off" /></NavLink>
        </div>
    )
}

export default Home;