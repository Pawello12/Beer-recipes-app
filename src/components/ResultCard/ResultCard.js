import React, { useContext, useState } from 'react';
import axios from 'axios';

import Button from 'components/Button/Button';
import LoggedUserContext from 'context/LoggedUserContext';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

import { resultCard, img, ul, h4, h3, p } from 'components/ResultCard/ResultCard.module.scss';

const recipesUrl = 'http://localhost:1337/favouriterecipes'

const ResultCard = ({data, buttonContent, buttonDelete, beerList, updateBeerList}) => {

    const [showError, setShowError] = useState('');
    const UserContext = useContext(LoggedUserContext);
    // console.log(UserContext.user)

    const {name, image_url, tagline, description, ibu, ebc, abv, volume, ingredients, method} = data;

    const addToFavouritesHandler = () => {
        // console.log(data);
        axios.post(recipesUrl,
            {
              users_premissions_user: UserContext.user.userName,
              owner: UserContext.user.userName,
              recipe: data,
              name: name,
              apiID: `${UserContext.user.userName}_${data.id}`
            },
            {
              headers: {
                Authorization:
                  `Bearer ${UserContext.user.token}`,
              },
            })
            .then(response => {
                // console.log(response);
                setShowError('Added to favourites')
            })
            .catch(error => {
                // console.log(error.response.status)
                if (error.response.status === 500) {
                    setShowError('Already in favourites')
                }
            })
    }

    const removeFromFavouritesHandler = () => {

        // console.log(data.id)
        let targetId = '';

        axios.get(`${recipesUrl}?apiID=${UserContext.user.userName}_${data.id}`, {
                headers: {
                  Authorization:
                    `Bearer ${UserContext.user.token}`,
                }
        })
        .then(response => {
            targetId = response.data[0].id;
            // console.log(targetId)

            axios.delete(`${recipesUrl}/${targetId}`, {
                headers: {
                  Authorization:
                    `Bearer ${UserContext.user.token}`,
                }
            })
             .then(response => {
                // console.log(response)
                const newBeerList = beerList.filter(beer => beer.recipe.id !== data.id)
                updateBeerList(newBeerList);
            })
            .catch(error => {
                console.log(error)
            })

        })
        .catch(error => {
            console.log(error)
        })
    }

    return(
        <div className={resultCard} >
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
            {UserContext.user.isUserLoggedIn && !showError &&  ! buttonDelete ? <Button content={buttonContent ? buttonContent : "Add to favourites"} clickHandler={addToFavouritesHandler} style={{marginTop: 'auto'}} /> : null}
            {buttonDelete ? <Button content="Delete" style={{marginTop: 'auto'}} clickHandler={removeFromFavouritesHandler} /> : null}
            {showError ? <ErrorMessage error={showError} style={{marginTop: "auto", marginBottom: "32px", fontSize: "16px"}} /> : null}
        </div>
    )
}

export default ResultCard;