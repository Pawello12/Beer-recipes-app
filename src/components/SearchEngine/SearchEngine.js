import React from 'react';

import Button from 'components/Button/Button';

import { searchEngine, h2, input, label } from 'components/SearchEngine/SearchEngine.module.scss';

const SearchEngine = () => {
    return(

        <div className={searchEngine}>
            <h2 className={h2}>Search Beer</h2>
            <label className={label} htmlFor="beerName">Beer name:</label>
            <input className={input} type="text" id='beerName' />
            <label className={label} htmlFor="hoops">Hoops:</label>
            <input className={input} type="text" id='hoops' />
            <label className={label} htmlFor="yeast">Yeast:</label>
            <input className={input} type="text" id='yeast' />
            <label className={label} htmlFor="maxIBU">Max IBU:</label>
            <input className={input} type="number" id='maxIBU' />
            <label className={label} htmlFor="minIBU">Min IBU:</label>
            <input className={input} type="number" id='minIBU:' />
            <Button content="Search" />
        </div>

    )
}

export default SearchEngine;