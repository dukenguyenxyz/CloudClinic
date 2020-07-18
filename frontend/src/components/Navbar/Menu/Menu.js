import React from 'react';
import { Link } from '@reach/router';
import { motion } from 'framer-motion';
import './Menu.scss';
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
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        className: isCurrent ? 'active' : 'inactive',
      };
    }}
  />
);

const Menu = ({ isOpen, user }) => {
  const iconSize = 20;
  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
        ease: 'easeInOut',
      },
    },
    hidden: {
      transition: {
        ease: 'easeInOut',
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: '50%', transition: { ease: 'easeInOut' } },
    show: { opacity: 1, x: '0%', transition: { ease: 'easeInOut' } },
  };

  const isDisabledStyle = {
    color: user ? '#212429' : '#dde2e5',
    cursor: user ? 'cursor' : 'not-allowed',
  };

  return (
    <div className="menu-wrapper">
      <motion.ul
        variants={container}
        initial="hidden"
        animate="show"
        animate={isOpen ? 'show' : 'hidden'}
      >
        <li>
          <NavLink to="profile">
            <div className="menu-item" style={isDisabledStyle}>
              <div className="tab" />
              <User size={iconSize} color={user ? '#212429' : '#dde2e5'} />
              <motion.span variants={item} style={isDisabledStyle}>
                Profile
              </motion.span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="patients">
            <div className="menu-item" style={isDisabledStyle}>
              <div className="tab" />
              <Clipboard size={iconSize} color={user ? '#212429' : '#dde2e5'} />
              <motion.span variants={item} style={isDisabledStyle}>
                Patients
              </motion.span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="messaging">
            <div className="menu-item" style={isDisabledStyle}>
              <div className="tab" />
              <MessageSquare
                size={iconSize}
                color={user ? '#212429' : '#dde2e5'}
              />
              <motion.span variants={item} style={isDisabledStyle}>
                Messaging
              </motion.span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="appointments">
            <div className="menu-item" style={isDisabledStyle}>
              <div className="tab" />
              <Calendar size={iconSize} color={user ? '#212429' : '#dde2e5'} />
              <motion.span variants={item} style={isDisabledStyle}>
                Appointments
              </motion.span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="settings">
            <div className="menu-item" style={isDisabledStyle}>
              <div className="tab" />
              <Settings size={iconSize} color={user ? '#212429' : '#dde2e5'} />
              <motion.span variants={item} style={isDisabledStyle}>
                Settings
              </motion.span>
            </div>
          </NavLink>
        </li>
      </motion.ul>
    </div>
  );
};

export default Menu;
