import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'

import Button from 'components/Button/Button';

import { nav, navActive, openMenu, openMenuActive } from 'components/Navigation/Navigation.module.scss';

const Navigation = ({user}) => {
console.log(user)
    const [menuOpen, setMenuOpen] = useState(false);

    const openMenuHandler = () => {
        setMenuOpen((prevState) => !prevState);
    }

    return (
        <nav className={menuOpen ? `${nav} ${navActive}` : `${nav}`} >
            <FontAwesomeIcon className={menuOpen ? `${openMenu} ${openMenuActive}` : `${openMenu}`} onClick={openMenuHandler} icon={faChevronCircleRight} size={'2x'} />
            {user.isUserLoggedIn ? <h2>{`Hello ${user.userName}`}</h2>: null}
            {!user.isUserLoggedIn ? <Button content={'Log In'}/> : null}
            {!user.isUserLoggedIn ? <Button content={'Create Account'}/> : null}
            {user.isUserLoggedIn ? <Button content={'Log out'}/> : null}
            {user.isUserLoggedIn ? <Button content={'Favourites'}/> : null}
            {user.isUserLoggedIn ? <Button content={'Search'}/> : null}
        </nav>
    )
}

export default Navigation;