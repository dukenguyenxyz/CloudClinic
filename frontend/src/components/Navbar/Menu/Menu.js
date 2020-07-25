import React from 'react';
import { Link, navigate } from '@reach/router';
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
    cursor: user ? 'pointer' : 'not-allowed',
  };

  const handleDisabledRoute = e => {
    e.preventDefault();
    return e.currentTarget.attributes[0].nodeName === 'disabled'
      ? navigate('/authentication', { replace: true })
      : navigate(`${e.currentTarget.href}`, { replace: true });
  };

  const hidePatientsLink = () => {
    if (!user || user.isDoctor) {
      return true;
    }

    if (!user.isDoctor) {
      // hide patient link
      return false;
    }
  };

  // console.log(user);

  return (
    <div className="menu-wrapper">
      <motion.ul
        variants={container}
        initial="hidden"
        animate={isOpen ? 'show' : 'hidden'}
      >
        <li>
          <NavLink
            to="profile"
            disabled={user ? false : true}
            onClick={handleDisabledRoute}
          >
            <div className="menu-item" style={isDisabledStyle}>
              <div className="tab" />
              <User size={iconSize} color={user ? '#212429' : '#dde2e5'} />
              <motion.span variants={item} style={isDisabledStyle}>
                Profile
              </motion.span>
            </div>
          </NavLink>
        </li>
        {hidePatientsLink() && (
          <li>
            <NavLink
              to="patients"
              disabled={user ? false : true}
              onClick={handleDisabledRoute}
            >
              <div className="menu-item" style={isDisabledStyle}>
                <div className="tab" />
                <Clipboard
                  size={iconSize}
                  color={user ? '#212429' : '#dde2e5'}
                />
                <motion.span variants={item} style={isDisabledStyle}>
                  Patients
                </motion.span>
              </div>
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            to="messaging"
            disabled={user ? false : true}
            onClick={handleDisabledRoute}
          >
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
          <NavLink
            to="appointments"
            disabled={user ? false : true}
            onClick={handleDisabledRoute}
          >
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
          <NavLink
            to="settings"
            disabled={user ? false : true}
            onClick={handleDisabledRoute}
          >
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
