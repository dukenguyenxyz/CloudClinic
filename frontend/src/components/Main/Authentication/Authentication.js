import React from 'react';
import { motion } from 'framer-motion';
import './Authentication.scss';
import Signup from './Signup/Signup';
import Signin from './Signin/Signin';
import Button from '../../Button/Button';

const Authentication = ({
  inAnimation,
  outAnimation,
  transition,
  initialAnimation,
}) => {
  const flag = true;
  return (
    <motion.div
      initial={initialAnimation}
      animate={inAnimation}
      exit={outAnimation}
      transition={transition}
    >
      {flag ? <Signup /> : <Signin />}
      <Button action="Are you a doctor" color="dark" />
    </motion.div>
  );
};

export default Authentication;
