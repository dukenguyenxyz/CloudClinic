import React from 'react';
import './Profile.scss';
import { LogOut } from 'react-feather';
import { motion } from 'framer-motion';
import { signOut } from '../../AxiosTest/userRoutes';

const Profile = ({ isOpen, user, setUser }) => {
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

  const handleSignOut = async () => {
    try {
      await signOut(setUser, '/');
    } catch (error) {
      console.log(error);
      setUser({
        ...user,
      });
    }
  };

  return (
    <div className="navbar-profile-wrapper">
      <div className="profile">
        <img className="avatar" src={user ? user.profileImage : null} />
        <motion.span
          className="name"
          variants={name}
          initial="hidden"
          animate={isOpen ? 'show' : 'hidden'}
        >
          {user && user.firstName}
        </motion.span>
      </div>
      <motion.div
        className="name"
        variants={logout}
        initial="hidden"
        animate={isOpen ? 'show' : 'hidden'}
      >
        <div className="logoout" onClick={() => handleSignOut()}>
          {user && <LogOut />}
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
