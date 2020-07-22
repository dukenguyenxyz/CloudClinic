import React from 'react';
import './Patients.scss';
import { motion } from 'framer-motion';

const Patients = ({
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

export default Patients;
