import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'

import Button from 'components/Button/Button';

import { nav, navActive, openMenu, openMenuActive } from 'components/Navigation/Navigation.module.scss';

const Navigation = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const openMenuHandler = () => {
        setMenuOpen((prevState) => !prevState);
    }

    return (
        <nav className={menuOpen ? `${nav} ${navActive}` : `${nav}`} >
            <FontAwesomeIcon className={menuOpen ? `${openMenu} ${openMenuActive}` : `${openMenu}`} onClick={openMenuHandler} icon={faChevronCircleRight} size={'2x'} />
           <Button content="Log in" />
           <Button content="Create account" />
        </nav>
    )
}

export default Navigation;