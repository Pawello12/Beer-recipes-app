import React from 'react';

import { header } from 'components/Header/Header.module.scss';

const Header = () => {
    return(
        <header className={header}>
            <h1>Beer Recipe App</h1>
        </header>
    )
}

export default Header;