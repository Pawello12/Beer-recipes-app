import React, { useState } from 'react';
import axios from 'axios';

import SearchEngine from 'components/SearchEngine/SearchEngine';
import ResultCard from 'components/ResultCard/ResultCard';

const apiUrl =  "https://api.punkapi.com/v2/beers";
const randomUrl = "https://api.punkapi.com/v2/beers/random";

const initialSearchValues = {
    beerName: '',
    hoops: '',
    yeast: '',
    maxIBU: '',
    minIBU: ''
}

const Search = () => {

    const [searchValues, setSearchValues] = useState(initialSearchValues);
    const [beers, setBeers] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [isError, setIsError] = useState(false);

    const inputChangeHandler = (e) => {
        setSearchValues({
            ...searchValues,
            [e.target.id]: e.target.value
        })
    }

    const searchHandler = () => {
        if (isLoading === false) {
            console.log(searchValues);
            setIsError(false);
            setIsloading(true);
            setBeers([]);
            const params = [];
            const customUrl = apiUrl;
            axios.get(customUrl)
                .then(response => {
                    console.log(response.data);
                    const beerList = [];
                    response.data.forEach(beer => {
                        beerList.push(beer);
                    })
                    console.log(beerList);
                    setBeers(beerList);
                    setIsloading(false);
                })
                .catch(error => {
                    console.log(error);
                    setIsloading(false);
                    setIsError(true);
                })
        }
    }

    const getRandomBeer = () => {
        if (isLoading === false) {
        console.log('random');
        setIsError(false);
        setIsloading(true);
        axios.get(randomUrl)
            .then(response => {
                console.log(response.data);
                const beerList = [];
                beerList.push(response.data[0])
                setBeers(beerList);
                setIsloading(false);
            })
            .catch(error => {
                console.log(error);
                setIsloading(false);
                setIsError(true);
            })
        }
    }

    return(
        <>
            <SearchEngine inputChangeHandler={inputChangeHandler} searchValues={searchValues} searchHandler={searchHandler} getRandomBeer={getRandomBeer} isLoading={isLoading} isError={isError} />
            {beers.map((beer, index) => <ResultCard key={index} data={beer} />)}
        </>
    )
}

export default Search;