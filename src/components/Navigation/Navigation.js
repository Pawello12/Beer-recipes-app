import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
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
            {!user.isUserLoggedIn ? <NavLink to="/login" ><Button content={'Log In'} to='/login'/></NavLink> : null}
            {!user.isUserLoggedIn ? <NavLink to="/register" ><Button content={'Create Account'} to='/login'/></NavLink> : null}
            {user.isUserLoggedIn ? <NavLink exact to="/" ><Button content={'Log out'} to='/login'/></NavLink> : null}
            {user.isUserLoggedIn ? <NavLink to="/favourites" ><Button content={'Favourites'} to='/login'/></NavLink> : null}
            {user.isUserLoggedIn ? <NavLink to="/search" ><Button content={'Search'} to='/login'/></NavLink> : null}
        </nav>
    )
}

export default Navigation;