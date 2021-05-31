import React, { useState } from 'react';

import Button from 'components/Button/Button';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';

import { searchEngine, h2, input, label } from 'components/SearchEngine/SearchEngine.module.scss';



const SearchEngine = ({inputChangeHandler, searchValues, searchHandler, getRandomBeer, isLoading, isError}) => {
    return(
        <form className={searchEngine}>
            <h2 className={h2}>Search Beer</h2>
            <label className={label} htmlFor="beerName">Beer name:</label>
            <input className={input} onChange={inputChangeHandler} value={searchValues.beerName} type="text" id='beerName' />
            <label className={label} htmlFor="hoops">Hop:</label>
            <input className={input} onChange={inputChangeHandler} value={searchValues.hops} type="text" id='hops' />
            <label className={label} htmlFor="yeast">Yeast:</label>
            <input className={input} onChange={inputChangeHandler} value={searchValues.yeast} type="text" id='yeast' />
            <label className={label} htmlFor="maxIBU">Max IBU:</label>
            <input className={input} onChange={inputChangeHandler} value={searchValues.maxIBU} min='0' max='120' type="number" id='maxIBU' />
            <label className={label} htmlFor="minIBU">Min IBU:</label>
            <input className={input} onChange={inputChangeHandler} value={searchValues.minIBU} min='0' max='120' type="number" id='minIBU' />
            <Button content="Search" clickHandler={searchHandler}  />
            <Button content="Random beer" clickHandler={getRandomBeer}  />
            <LoadingSpinner isLoading={isLoading} isError={isError} />
        </form>
    )
}

export default SearchEngine;