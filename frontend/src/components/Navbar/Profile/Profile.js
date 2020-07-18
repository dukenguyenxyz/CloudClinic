import React from 'react';
import './Profile.scss';
import { LogOut } from 'react-feather';
import { motion } from 'framer-motion';

const Profile = ({ isOpen, user }) => {
  const name = {
    hidden: { opacity: 0, x: '50%', transition: { ease: 'easeInOut' } },
    show: {
      opacity: 1,
      x: '0%',
      transition: { ease: 'easeInOut', delay: 0.5 },
    },
  };

  const logout = {
    hidden: { opacity: 0, transition: { ease: 'easeInOut' } },
    show: {
      opacity: 1,
      transition: { ease: 'easeInOut', delay: 0.75 },
    },
  };
  return (
    <div className="navbar-profile-wrapper">
      <div className="profile">
        <div className="avatar" />
        <motion.span
          className="name"
          variants={name}
          initial="hidden"
          animate="show"
          animate={isOpen ? 'show' : 'hidden'}
        >
          {user && user.name}
        </motion.span>
      </div>
      <motion.div
        className="logout"
        className="name"
        variants={logout}
        initial="hidden"
        animate="show"
        animate={isOpen ? 'show' : 'hidden'}
      >
        {user && <LogOut />}
      </motion.div>
    </div>
  );
};

export default Profile;
