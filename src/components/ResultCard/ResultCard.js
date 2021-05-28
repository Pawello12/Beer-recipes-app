import React from 'react';

import Button from 'components/Button/Button';

import { resultCard, img } from 'components/ResultCard/ResultCard.module.scss';

const ResultCard = () => {
    return(
        <div className={resultCard}>
            <h3>Name</h3>
            <img className={img} src="https://images.punkapi.com/v2/131.png" alt="Name" />
            <h4>Description</h4>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam, autem omnis, mollitia architecto a eius aliquam beatae, eligendi non ipsam alias sit id. Architecto, recusandae eum in deserunt aperiam molestias.</p>
            <h4>Params:</h4>
            <ul>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            <h4>ingredients:</h4>
            <ul>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            <h4>Mash:</h4>
            <ul>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            <h4>Fermentation:</h4>
            <ul>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            <Button content="Add to favourites" />
        </div>
    )
}

export default ResultCard;