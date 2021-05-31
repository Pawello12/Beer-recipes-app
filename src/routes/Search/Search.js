import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons'

import SearchEngine from 'components/SearchEngine/SearchEngine';
import ResultCard from 'components/ResultCard/ResultCard';
import Button from 'components/Button/Button';

import {topBtn, topBtnActive} from 'routes/Search/Search.module.scss';

const apiUrl =  "https://api.punkapi.com/v2/beers";
const randomUrl = "https://api.punkapi.com/v2/beers/random";

const initialSearchValues = {
    beerName: '',
    hops: '',
    yeast: '',
    maxIBU: 120,
    minIBU: 1,
}

const Search = () => {

    const [searchValues, setSearchValues] = useState(initialSearchValues);
    const [beers, setBeers] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [page, setPage] = useState(2);
    const [lastUrl, setLastUrl] = useState('');
    const [showMoreBeerButton, setShowMoreBeerButton] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);

    const showButton = () => {
        // console.log(window.scrollY);
        if (window.scrollY > 100) {
            setShowBackToTop(true)
        } else {
            setShowBackToTop(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', showButton)
    }, [])

    const scrollToTopHandler = () => {
        window.scrollTo(0, 0)
    }


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
            setPage(2);

            const params = [];
            if (searchValues.beerName !== '') {
                const words = searchValues.beerName.split(' ')
                params.push(`beer_name=${words.join('_')}`);
            }
            if (searchValues.hops !== '') {
                const words = searchValues.hops.split(' ');
                params.push(`hops=${words.join('_')}`);
            }
            if (searchValues.yeast !== '') {
                const words = searchValues.yeast.split(' ');
                params.push(`yeast=${words.join('_')}`)
            }
            if (searchValues.maxIBU !== '') {
                params.push(`ibu_lt=${searchValues.maxIBU}`)
            }
            if (searchValues.minIBU !== '') {
                params.push(`ibu_gt=${searchValues.minIBU}`)
            }

            console.log(params);
            let customUrl;

            if (params.length > 0) {
                customUrl = apiUrl + '?' + params.join('&')
            } else {
                customUrl = apiUrl;
            }

            console.log(customUrl);
            setLastUrl(customUrl);
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
                    if (beerList.length > 24) {
                        setShowMoreBeerButton(true);
                    }
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

    const nextBeers = () => {
        if (beers.length > 24 && showMoreBeerButton === true) {
        return <Button content="More beer!" clickHandler={loadNextBeers} />
        }
    }

    const loadNextBeers = () => {
        console.log(page)
        axios.get(lastUrl + `&page=${page + 1}`)
            .then(response => {
                    const beerList = [];
                    console.log(lastUrl + `&page=${page}`)
                    response.data.forEach(beer => {
                        beerList.push(beer);
                    })
                    console.log(beerList);
                    const nextpage = page + 1;
                    setPage(nextpage);
                    setBeers(beers.concat(beerList));
                    if(response.data.length < 25) {
                        setShowMoreBeerButton(false);
                    }
            })
            .catch(error => {
                console.log(error)
            })
    }

    return(
        <>
            <SearchEngine inputChangeHandler={inputChangeHandler} searchValues={searchValues} searchHandler={searchHandler} getRandomBeer={getRandomBeer} isLoading={isLoading} isError={isError} />
            {beers.map((beer, index) => <ResultCard key={index} data={beer} />)}
            {nextBeers()}
            <FontAwesomeIcon icon={faArrowAltCircleUp} size="3x" onClick={scrollToTopHandler} className={`${topBtn} ${showBackToTop ? topBtnActive : null}`} />
        </>
    )
}

export default Search;