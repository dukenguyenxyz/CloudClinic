import React, { useContext } from 'react';
import Search from '../Search/Search';
import './Header.scss';
import { AuthContext } from '../../globalState/index';

const Header = ({ location }) => {
  const { user } = useContext(AuthContext);

  function getPathName() {
    if (location.pathname === '/' && user) {
      return `Welcome ${user.firstName}`;
    }

    if (location.pathname === '/' && !user) {
      return `Home`;
    }

    if (location.state !== null) {
      let viewLocation = location.pathname.replace(/[^a-z]/g, '');
      return viewLocation.charAt(0).toUpperCase() + viewLocation.slice(1);
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
