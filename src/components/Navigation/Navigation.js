import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'

import Button from 'components/Button/Button';
import LoggedUserContext from 'context/LoggedUserContext';

import { nav, navActive, openMenu, openMenuActive } from 'components/Navigation/Navigation.module.scss';

const Navigation = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const user = useContext(LoggedUserContext);
    console.log(user.user)

    const openMenuHandler = () => {
        setMenuOpen((prevState) => !prevState);
    }

    const closeMenuAfterClickButton = () => {
        setMenuOpen(false);
    }

    return (
        <nav className={menuOpen ? `${nav} ${navActive}` : `${nav}`} >
            <FontAwesomeIcon className={menuOpen ? `${openMenu} ${openMenuActive}` : `${openMenu}`} onClick={openMenuHandler} icon={faChevronCircleRight} size={'2x'} />
            {user.user.isUserLoggedIn ? <h2>{`Hello ${user.user.userName}`}</h2>: null}
            {!user.user.isUserLoggedIn ? <NavLink to="/login" ><Button content={'Log In'} clickHandler={closeMenuAfterClickButton} to='/login'/></NavLink> : null}
            {!user.user.isUserLoggedIn ? <NavLink to="/register" ><Button content={'Create Account'} clickHandler={closeMenuAfterClickButton} to='/login'/></NavLink> : null}
            {user.user.isUserLoggedIn ? <NavLink exact to="/" ><Button content={'Log out'} clickHandler={closeMenuAfterClickButton} to='/login'/></NavLink> : null}
            {user.user.isUserLoggedIn ? <NavLink to="/favourites" ><Button content={'Favourites'} clickHandler={closeMenuAfterClickButton} to='/login'/></NavLink> : null}
            {user.user.isUserLoggedIn ? <NavLink to="/search" ><Button content={'Search'} clickHandler={closeMenuAfterClickButton} to='/login'/></NavLink> : null}
        </nav>
    )
}

export default Navigation;