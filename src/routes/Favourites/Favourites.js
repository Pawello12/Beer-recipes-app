import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ResultCard from 'components/ResultCard/ResultCard';

import { favourites } from 'routes/Favourites/Favourites.module.scss';

const Favourites = () => {

    const [beer, setBeer] = useState([]);
    const [showCard, setShowCard] = useState(false);

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
        </div>
    )
}

export default Favourites;
