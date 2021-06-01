import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'

import Button from 'components/Button/Button';
import LoggedUserContext from 'context/LoggedUserContext';

import { nav, navActive, openMenu, openMenuActive } from 'components/Navigation/Navigation.module.scss';

const Navigation = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const UserContext = useContext(LoggedUserContext);
    // console.log(UserContext.setUser)

    const openMenuHandler = () => {
        setMenuOpen((prevState) => !prevState);
    }

    const closeMenuAfterClickButton = () => {
        setMenuOpen(false);
    }

    const logOut = () => {
        localStorage.clear();
        UserContext.setUser({
            isUserLoggedIn: false,
            userName: '',
            token: ''
        })
        closeMenuAfterClickButton();
    }



    return (
        <nav className={menuOpen ? `${nav} ${navActive}` : `${nav}`} >
            <FontAwesomeIcon className={menuOpen ? `${openMenu} ${openMenuActive}` : `${openMenu}`} onClick={openMenuHandler} icon={faChevronCircleRight} size={'2x'} />
            {UserContext.user.isUserLoggedIn ? <h2>{`Hello ${UserContext.user.userName}`}</h2>: null}
            {!UserContext.user.isUserLoggedIn ? <NavLink to="/login" ><Button content={'Log In'} clickHandler={closeMenuAfterClickButton} to='/login'/></NavLink> : null}
            {!UserContext.user.isUserLoggedIn ? <NavLink to="/register" ><Button content={'Create Account'} clickHandler={closeMenuAfterClickButton} to='/login'/></NavLink> : null}
            {UserContext.user.isUserLoggedIn ? <NavLink exact to="/" ><Button content={'Log out'} clickHandler={logOut} to='/login'/></NavLink> : null}
            {UserContext.user.isUserLoggedIn ? <NavLink to="/favourites" ><Button content={'Favourites'} clickHandler={closeMenuAfterClickButton} to='/login'/></NavLink> : null}
            {UserContext.user.isUserLoggedIn ? <NavLink to="/search" ><Button content={'Search'} clickHandler={closeMenuAfterClickButton} to='/login'/></NavLink> : null}
        </nav>
    )
}

export default Navigation;