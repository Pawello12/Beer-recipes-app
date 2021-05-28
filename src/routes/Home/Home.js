import React from 'react';

import Button from 'components/Button/Button';

import { home, name, description } from './Home.module.scss';

const Home = () => {
    return (
        <div className={home}>
            <h1 className={name}>Beer Recipes App</h1>
            <p className={description}>Log in to add recipes to your favourite.</p>
            <Button content="Log in" />
            <Button content="Create account" />
            <Button content="Stay logged off" />
        </div>
    )
}

export default Home;