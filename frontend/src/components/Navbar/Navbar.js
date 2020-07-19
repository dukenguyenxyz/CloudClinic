import React, { useContext, useEffect } from 'react';
import { NavbarContext, AuthContext } from '../../globalState/index';
import { motion, useCycle } from 'framer-motion';
import './Navbar.scss';
import Logo from './Logo/Logo';
import Profile from './Profile/Profile';
import Menu from './Menu/Menu';
import Hamburger from './Hamburger/Hamburger';

const Navbar = ({ location }) => {
  const { isOpen, setIsOpen } = useContext(NavbarContext);
  const { user } = useContext(AuthContext);
  const [animateMenu, cycleMenu] = useCycle(
    { width: '70px' },
    { width: '208px' }
  );

  useEffect(() => {
    return () => {
      cycleMenu();
    };
  }, [isOpen]);

  return (
    <motion.header
      className="navbar-wrapper"
      animate={animateMenu}
      transition={{ ease: 'easeInOut' }}
    >
      <div className="navbar-container">
        <nav>
          <Logo isOpen={isOpen} />
          <Menu isOpen={isOpen} user={user} location={location} />
          <div>
            <Hamburger setIsOpen={setIsOpen} isOpen={isOpen} />
            <Profile isOpen={isOpen} user={user} />
          </div>
        </nav>
      </div>
    </motion.header>
  );
};

export default Navbar;
