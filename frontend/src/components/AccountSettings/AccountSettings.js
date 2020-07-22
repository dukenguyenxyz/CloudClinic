import React from 'react';
import { motion } from 'framer-motion';
import './AccountSettings.scss';

const AccountSettings = ({
  inAnimation,
  outAnimation,
  transition,
  initialAnimation,
  variants,
}) => {
  return (
    <motion.div
      variants={variants}
      initial={initialAnimation}
      animate={inAnimation}
      exit={outAnimation}
      transition={transition}
    >
      <h1>Account settings</h1>
    </motion.div>
  );
};

export default AccountSettings;
