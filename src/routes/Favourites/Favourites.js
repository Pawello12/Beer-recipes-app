import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import ResultCard from 'components/ResultCard/ResultCard';
import LoggedUserContext from 'context/LoggedUserContext';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';

import { favouritesHeader } from 'routes/Favourites/Favourites.module.scss';

const favouritesUrl = 'https://beer-recipes-app-backend.herokuapp.com/favouriterecipes'

const Favourites = () => {

    const [beer, setBeer] = useState([]);
    // const [showCard, setShowCard] = useState(false);
    // const [responseObjects, setResponseObjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const UserContext = useContext(LoggedUserContext);


    useEffect(() => {
        if (UserContext.user.userName) {
            setIsLoading(true);
        axios.get(`${favouritesUrl}?owner=${UserContext.user.userName}`, {

            headers: {
                Authorization:
                  `Bearer ${UserContext.user.token}`
            }
        })
            .then(response => {
                // console.log('response: ', response.data);
                setIsLoading(false);
                setBeer(response.data);
            })
            .catch(error => {
                setIsLoading(false);
                console.log(error.response)
            })


    }
    },[])

    return (
        <>
            <h2 className={favouritesHeader}>Your favourite recipes</h2>
            {isLoading ? <LoadingSpinner isLoading style={{gridColumn: "1/-1"}} /> : null}
            {beer.map((item, index) => <ResultCard key={index} data={item.recipe} buttonDelete={true} beerList={beer} updateBeerList={setBeer} />)}
            {!UserContext.user.isUserLoggedIn ? <Redirect to="/" /> : null}
        </>
    )
}

export default Favourites;
