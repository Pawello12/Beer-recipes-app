import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import ResultCard from 'components/ResultCard/ResultCard';
import LoggedUserContext from 'context/LoggedUserContext';

import { favourites } from 'routes/Favourites/Favourites.module.scss';

const favouritesUrl = 'http://localhost:1337/favouriterecipes'

const Favourites = () => {

    const [beer, setBeer] = useState([]);
    const [showCard, setShowCard] = useState(false);
    const [responseObjects, setResponseObjects] = useState([]);

    const UserContext = useContext(LoggedUserContext);


    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
        axios.get(`${favouritesUrl}?owner=${UserContext.user.userName}`, {
            headers: {
                Authorization:
                  `Bearer ${UserContext.user.token}`
            }
        })
            .then(response => {
                console.log('response: ', response.data);
                setBeer(response.data);
            })
            .catch(error => {
                console.log(error.response)
            })
        }
            return () => isSubscribed = false;
    },[])



    return (
        <div className={favourites}>
            <h2>Your favourite recipes</h2>
            {beer.map((item, index) => <ResultCard key={index} data={item.recipe} buttonDelete={true} beerList={beer} updateBeerList={setBeer} />)}
            {!UserContext.user.isUserLoggedIn ? <Redirect to="/" /> : null}
        </div>
    )
}

export default Favourites;
