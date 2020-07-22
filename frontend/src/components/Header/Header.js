import React, { useContext, useState, useEffect } from 'react';
import Search from '../Search/Search';
import './Header.scss';
import { AuthContext, NavbarContext } from '../../globalState/index';
import Logo from '../Navbar/Logo/Logo';
import MobileMenu from '../MobileMenu/MobileMenu';

const Header = ({ location }) => {
  const { user } = useContext(AuthContext);
  const { isOpen, setIsOpen } = useContext(NavbarContext);
  const [isMobile, setIsMobile] = useState(false);

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

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  });

  useEffect(() => {
    const width = window.innerWidth;
    if (width <= 425) {
      setIsMobile(true);
    }
  }, []);

  const handleResize = () => {
    const width = window.innerWidth;
    //remove toolbar and show mobile menu
    if (width <= 425) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  return isMobile ? (
    <>
      <MobileMenu isOpen={isOpen} user={user} setIsOpen={setIsOpen} />
      <header className="header-wrapper">
        <div className="mobile-header">
          <Logo isOpen={isOpen} isMobile={isMobile} />
          <Search />
        </div>
        <h1>{getPathName()}</h1>
      </header>
    </>
  ) : (
    <header className="header-wrapper">
      <h1>{getPathName()}</h1>
      <Search />
    </header>
  );
};

export default Header;
