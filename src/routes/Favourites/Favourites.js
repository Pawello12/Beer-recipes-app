import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import ResultCard from 'components/ResultCard/ResultCard';
import LoggedUserContext from 'context/LoggedUserContext';

import { favouritesHeader } from 'routes/Favourites/Favourites.module.scss';

const favouritesUrl = 'https://beer-recipes-app-backend.herokuapp.com/favouriterecipes'

const Favourites = () => {

    const [beer, setBeer] = useState([]);
    // const [showCard, setShowCard] = useState(false);
    // const [responseObjects, setResponseObjects] = useState([]);

    const UserContext = useContext(LoggedUserContext);


    useEffect(() => {



        if (UserContext.user.userName) {
        axios.get(`${favouritesUrl}?owner=${UserContext.user.userName}`, {

            headers: {
                Authorization:
                  `Bearer ${UserContext.user.token}`
            }
        })
            .then(response => {
                // console.log('response: ', response.data);
                setBeer(response.data);
            })
            .catch(error => {
                console.log(error.response)
            })


    }
    },[])

    return (
        <>
            <h2 className={favouritesHeader}>Your favourite recipes</h2>
            {beer.map((item, index) => <ResultCard key={index} data={item.recipe} buttonDelete={true} beerList={beer} updateBeerList={setBeer} />)}
            {!UserContext.user.isUserLoggedIn ? <Redirect to="/" /> : null}
        </>
    )
}

export default Favourites;
