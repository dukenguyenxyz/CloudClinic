import React, { useContext, useState, useEffect } from 'react';
import Search from '../Search/Search';
import './Header.scss';
import { AuthContext, NavbarContext } from '../../globalState/index';
import Logo from '../Navbar/Logo/Logo';
import MobileMenu from '../MobileMenu/MobileMenu';
import { motion } from 'framer-motion';

const Header = ({
  location,
  variants,
  initialAnimation,
  inAnimation,
  outAnimation,
  transition,
}) => {
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

    if (location.pathname === '/profile' && user) {
      return `Your Profile`;
    }

    if (location.pathname.includes('doctors')) {
      return `Doctors`;
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
      <motion.header
        className="header-wrapper"
        variants={variants}
        initial={initialAnimation}
        animate={inAnimation}
        exit={outAnimation}
        transition={transition}
      >
        <div className="mobile-header">
          <Logo isOpen={isOpen} isMobile={isMobile} />
          <Search />
        </div>
        <h1>{getPathName()}</h1>
      </motion.header>
    </>
  ) : (
    <motion.header
      className="header-wrapper"
      variants={variants}
      initial={initialAnimation}
      animate={inAnimation}
      exit={outAnimation}
      transition={transition}
    >
      <h1>{getPathName()}</h1>
      <Search />
    </motion.header>
  );
};

export default Header;
