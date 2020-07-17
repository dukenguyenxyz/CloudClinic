import React from 'react';

import './Navbar.scss';

import Logo from './Logo/Logo';
import Profile from './Profile/Profile';
import Menu from './Menu/Menu';
import Hamburger from './Hamburger/Hamburger';

const Navbar = () => {
  return (
    <header className="navbar-wrapper">
      <nav>
        <Logo />
        <Menu />
        <div>
          <Hamburger />
          <Profile />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
