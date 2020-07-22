import React from 'react';
import './Profile.scss';
import { motion } from 'framer-motion';

const Profile = ({
  children,
  inAnimation,
  outAnimation,
  transition,
  initialAnimation,
  variants,
}) => {
  // console.log(inAnimation, outAnimation, transition, initialAnimation);
  return (
    <motion.div
      variants={variants}
      initial={initialAnimation}
      animate={inAnimation}
      exit={outAnimation}
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

export default Profile;
