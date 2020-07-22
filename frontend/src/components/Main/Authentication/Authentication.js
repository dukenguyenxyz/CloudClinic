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
  return (
    <motion.div
      initial={initialAnimation}
      animate={inAnimation}
      exit={outAnimation}
      transition={transition}
      className="authentication-wrapper"
    >
      <div className="panel-l">
        {authAction ? (
          <h1>Need to create an account?</h1>
        ) : (
          <h1>Already have an account?</h1>
        )}
        <Button
          action={authAction ? 'Sign up' : 'Sign in'}
          color="dark"
          onClick={handleClick}
        />
      </div>
      <div className="panel-r">{authAction ? <Signin /> : <Signup />}</div>
    </motion.div>
  );
};

export default Authentication;
