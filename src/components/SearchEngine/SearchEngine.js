import React, { useState } from 'react';

import Button from 'components/Button/Button';

import { searchEngine, h2, input, label } from 'components/SearchEngine/SearchEngine.module.scss';

const initialSearchValues = {
    beerName: '',
    hoops: '',
    yeast: '',
    maxIBU: null,
    minIBU: null
}

const SearchEngine = () => {

    const [searchValues, setSearchValues] = useState(initialSearchValues);

    const inputChangeHandler = (e) => {
        setSearchValues({
            ...searchValues,
            [e.target.id]: e.target.value
        })
    }

    return(

        <div className={searchEngine}>
            <h2 className={h2}>Search Beer</h2>
            <label className={label} htmlFor="beerName">Beer name:</label>
            <input className={input} onChange={inputChangeHandler} value={searchValues.beerName} type="text" id='beerName' />
            <label className={label} htmlFor="hoops">Hoops:</label>
            <input className={input} onChange={inputChangeHandler} value={searchValues.hoops} type="text" id='hoops' />
            <label className={label} htmlFor="yeast">Yeast:</label>
            <input className={input} onChange={inputChangeHandler} value={searchValues.yeast} type="text" id='yeast' />
            <label className={label} htmlFor="maxIBU">Max IBU:</label>
            <input className={input} onChange={inputChangeHandler} value={searchValues.maxIBU} min='0' max='140' type="number" id='maxIBU' />
            <label className={label} htmlFor="minIBU">Min IBU:</label>
            <input className={input} onChange={inputChangeHandler} value={searchValues.minIBU} min='0' max='140' type="number" id='minIBU:' />
            <Button content="Search" />
        </div>

    )
}

export default SearchEngine;