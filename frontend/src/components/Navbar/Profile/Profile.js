import React from 'react';
import './Profile.scss';
import { LogOut } from 'react-feather';
import { motion } from 'framer-motion';
import { signOut } from '../../AxiosTest/userRoutes';
import placeholder from '../../../assets/placeholder.jpg';

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

  if (user && user.profileImage === undefined) {
    console.log('hello');
  }

  return (
    <div className="navbar-profile-wrapper">
      <div className="profile">
        {user && user.profileImage ? (
          <img className="avatar" src={user.profileImage} alt="" />
        ) : (
          <img className="avatar" src={placeholder} alt="" />
        )}
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
