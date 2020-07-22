import React from 'react';
import './Messaging.scss';
import Feed from './Feed/Feed';
import { motion } from 'framer-motion';

const Messaging = ({
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
      <Feed />
    </motion.div>
  );
};

export default Messaging;
