import React from 'react';

import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import MenuButton from '../MenuButton/MenuButton';

import IsLoggedInContext from '../../contexts/IsLoggedInContext';

import './header.css';

function Header(props) {
  const isLoggedIn = React.useContext(IsLoggedInContext);

  return (
    <header className="header">
      <Logo />
      <Navigation location={ props.location } />
      {
        isLoggedIn && <MenuButton location={ props.location } onMenuOpen={ props.onMenuOpen } />
      }
    </header>
  );
}

export default Header;
