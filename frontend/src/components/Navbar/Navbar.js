import React, { useContext, useEffect } from 'react';
import { NavbarContext } from '../../globalState/index';
import { motion, useCycle } from 'framer-motion';
import './Navbar.scss';
import Logo from './Logo/Logo';
import Profile from './Profile/Profile';
import Menu from './Menu/Menu';
import Hamburger from './Hamburger/Hamburger';

const Navbar = () => {
  const { isOpen, setIsOpen } = useContext(NavbarContext);
  const [animateMenu, cycleMenu] = useCycle(
    { width: '72px' },
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
          <Menu isOpen={isOpen} />
          <div>
            <Hamburger setIsOpen={setIsOpen} isOpen={isOpen} />
            <Profile isOpen={isOpen} />
          </div>
        </nav>
      </div>
    </motion.header>
  );
};

export default Navbar;
