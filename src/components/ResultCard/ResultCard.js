import React from 'react';

import Button from 'components/Button/Button';

import { resultCard, img, ul, h4, h3, p } from 'components/ResultCard/ResultCard.module.scss';

const ResultCard = ({data, buttonContent}) => {
    console.log(data);
     const {name, image_url, tagline, description, ibu, ebc, abv, volume, ingredients, method} = data;
    return(
        <div className={resultCard}>
            <h3 className={h3}>{name}</h3>
            {image_url ? <img className={img} src={image_url} alt="Name" /> : null}
            <h4 className={h4}>{tagline}</h4>
            <p className={p}>{description}</p>
            <h4 className={h4}>Params:</h4>
            <ul className={ul}>
                <li>Alc: <strong>{abv}%</strong></li>
                <li>Bitterness: <strong>{ibu} IBU</strong></li>
                <li>EBC: <strong>{ebc}</strong></li>
                <li>Breew volume: <strong>{volume.value} {volume.unit}</strong></li>
            </ul>
            <h4 className={h4}>Malts:</h4>
            <ul className={ul}>
                {ingredients.malt.map((malt, index) => <li key={index}>{malt.name} - <strong>{malt.amount.value} {malt.amount.unit}</strong></li>)}
            </ul>
            <h4 className={h4}>Mash:</h4>
            <ul className={ul}>
                {method.mash_temp.map((temp, index) => <li key={index}>{temp.temp.value ? temp.temp.value : '65'} {temp.temp.unit} {temp.duration ? `- ${temp.duration} minutes` : `- 60 minutes`}</li>)}
            </ul>
            <h4 className={h4}>Hops:</h4>
            <ul className={ul}>
                {ingredients.hops.map((hop, index) => <li key={index}>{hop.name} - <strong>{hop.amount.value} {hop.amount.unit}</strong> - {hop.add} {!isNaN(hop.add) ? 'minutes' : null}</li>)}
            </ul>
            <h4 className={h4}>Fermentation:</h4>
            <ul className={ul}>
                <li>Yeast {ingredients.yeast}</li>
                <li>Temperature: <strong>{method.fermentation.temp.value} {method.fermentation.temp.unit}</strong></li>
            </ul>
            <Button content={buttonContent ? buttonContent : "Add to favourites"} style={{marginTop: 'auto'}} />
        </div>
    )
}

export default ResultCard;