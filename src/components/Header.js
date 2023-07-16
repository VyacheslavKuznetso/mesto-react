import React from 'react';
import HeaderLog from '../images/Logo.svg'

function Header () {
    return (
        <header className="header">
            <img className="header__logo" src={HeaderLog} alt="Места в России" />
        </header>
    )
}

export default Header;