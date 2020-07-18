import React from 'react';
import Search from '../Search/Search';
import './Header.scss';

const Header = ({ location }) => {
  function getPathName() {
    if (location.pathname === '/') {
      return 'Home';
    }

    if (location.state !== null) {
      return (
        location.pathname.slice(1).charAt(0).toUpperCase() +
        location.pathname.slice(2)
      );
    }
  }

  return (
    <header className="header-wrapper">
      <h1>{getPathName()}</h1>
      <Search />
    </header>
  );
};

export default Header;
