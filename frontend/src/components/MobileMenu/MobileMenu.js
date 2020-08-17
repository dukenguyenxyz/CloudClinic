import React from 'react';
import './MobileMenu.scss';
import { Link } from '@reach/router';
import { AnimatePresence, motion } from 'framer-motion';
import {
  User,
  Clipboard,
  MessageSquare,
  Calendar,
  Settings,
} from 'react-feather';

const NavLink = props => (
  <Link
    {...props}
    getProps={({ location, href }) => {
      // can also destructure isCurrent prop which returns true if the location.pathname is exactly the same as the anchor’s href.
      // the object returned here is passed to the
      // anchor element's props'

      return {
        className: location.pathname.includes(href) ? 'active' : 'inactive',
      };
    }}
  />
);

const MobileMenu = ({ isOpen, user, setIsOpen }) => {
  const iconSize = '1.5rem';
  const menu = {
    hidden: {
      height: '0%',
      transition: { ease: 'easeInOut', duration: 1 },
    },
    show: {
      height: '100%',
      transition: { ease: 'easeInOut', duration: 1 },
    },
    out: {
      display: 'none',
    },
  };

  const menuUl = {
    hidden: {
      opacity: '0%',
      pointerEvents: 'none',
      transition: {
        staggerChildren: 0.2,
        ease: 'easeInOut',
        duration: 1.5,
      },
    },
    show: {
      opacity: '100%',
      pointerEvents: 'auto',

      transition: {
        staggerChildren: 0.2,
        ease: 'easeInOut',
        duration: 1.5,
      },
    },

    out: {
      display: 'none',
    },
  };

  const menuLi = {
    hidden: {
      opacity: '0%',
      y: 150,
      transition: { ease: 'easeInOut', duration: 0.3 },
    },
    show: {
      opacity: '100%',
      y: 0,
      transition: { ease: 'easeInOut', duration: 0.3 },
    },
  };

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <motion.div
        className="mobile-menu-wrapper"
        variants={menu}
        initial="hidden"
        exit="out"
        animate={isOpen ? 'show' : 'hidden'}
      >
        <div className="mobile-menu-container">
          <motion.ul
            variants={menuUl}
            initial="hidden"
            animate={isOpen ? 'show' : 'hidden'}
            exit="out"
          >
            <motion.li variants={menuLi} onClick={() => setIsOpen(false)}>
              <NavLink to="profile">
                <User size={iconSize} color={user ? '#ffffff' : '#dde2e5'} />
                <span>Profile</span>
              </NavLink>
            </motion.li>
            <motion.li variants={menuLi} onClick={() => setIsOpen(false)}>
              <NavLink to="patients">
                <Clipboard
                  size={iconSize}
                  color={user ? '#ffffff' : '#dde2e5'}
                />
                <span>Patients</span>
              </NavLink>
            </motion.li>
            <motion.li variants={menuLi} onClick={() => setIsOpen(false)}>
              <NavLink to="messaging">
                <MessageSquare
                  size={iconSize}
                  color={user ? '#ffffff' : '#dde2e5'}
                />
                <span>Messaging</span>
              </NavLink>
            </motion.li>
            <motion.li variants={menuLi} onClick={() => setIsOpen(false)}>
              <NavLink to="appointments">
                <Calendar
                  size={iconSize}
                  color={user ? '#ffffff' : '#dde2e5'}
                />
                <span>Appointments</span>
              </NavLink>
            </motion.li>
            <motion.li variants={menuLi} onClick={() => setIsOpen(false)}>
              <NavLink to="settings">
                <Settings
                  size={iconSize}
                  color={user ? '#ffffff' : '#dde2e5'}
                />
                <span>Settings</span>
              </NavLink>
            </motion.li>
          </motion.ul>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MobileMenu;
