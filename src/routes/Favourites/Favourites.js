import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import ResultCard from 'components/ResultCard/ResultCard';
import LoggedUserContext from 'context/LoggedUserContext';

import { favourites } from 'routes/Favourites/Favourites.module.scss';

const Favourites = () => {

    const [beer, setBeer] = useState([]);
    const [showCard, setShowCard] = useState(false);

    const UserContext = useContext(LoggedUserContext);

    useEffect(() => {
        axios.get('https://api.punkapi.com/v2/beers/random')
            .then(response => {
                setBeer([...response.data])
                console.log(beer);
                setShowCard(true);
            })
    },[])

    return (
        <div className={favourites}>
            <h2>Your favourite recipes</h2>
            {showCard ? <ResultCard buttonContent='Remove recipe' data={beer[0]} /> : null}
            {!UserContext.user.isUserLoggedIn ? <Redirect to="/" /> : null}
        </div>
    )
}

export default Favourites;
