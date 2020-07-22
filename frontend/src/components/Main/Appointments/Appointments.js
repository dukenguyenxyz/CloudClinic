import React from 'react';
import { motion } from 'framer-motion';
import MainCalendar from './MainCalendar/MainCalendar';
import './Appointments.scss';

const Appointments = ({
  inAnimation,
  outAnimation,
  transition,
  initialAnimation,
  variants,
}) => {
  return (
    <motion.div
      className="appointments-wrapper"
      variants={variants}
      initial={initialAnimation}
      animate={inAnimation}
      exit={outAnimation}
      transition={transition}
    >
      <MainCalendar />
    </motion.div>
  );
};

export default Appointments;
