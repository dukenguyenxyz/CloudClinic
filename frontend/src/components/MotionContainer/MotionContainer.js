import React from 'react';
import { motion } from 'framer-motion';

const MotionContainer = ({
  children,
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
      {children}
    </motion.div>
  );
};

export default MotionContainer;
