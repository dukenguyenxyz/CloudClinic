import React from 'react';
import { motion } from 'framer-motion';

const FourOhFour = ({
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
      <h1>404: Sorry, page not found</h1>
    </motion.div>
  );
};

export default FourOhFour;
