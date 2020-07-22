import React, { useState } from 'react';
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
  const [authAction, setAuthAction] = useState(false);

  const handleClick = () => {
    setAuthAction(!authAction);
  };
  const flag = true;
  return (
    <motion.div
      initial={initialAnimation}
      animate={inAnimation}
      exit={outAnimation}
      transition={transition}
    >
      {authAction ? <Signup /> : <Signin />}

      {authAction ? (
        <h1>Create your account</h1>
      ) : (
        <h1>Sign in to your account</h1>
      )}
      <Button
        action={authAction ? 'Sign up' : 'Sign in'}
        color="dark"
        onClick={handleClick}
      />
    </motion.div>
  );
};

export default Authentication;
