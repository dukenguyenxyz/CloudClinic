import React, { useState } from 'react';
import './Authentication.scss';
import Signup from './Signup/Signup';
import Signin from './Signin/Signin';
import Button from '../../Button/Button';

const Authentication = ({}) => {
  const [authAction, setAuthAction] = useState(false);

  const handleClick = () => {
    setAuthAction(!authAction);
  };
  return (
    <div className="authentication-wrapper">
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
    </div>
  );
};

export default Authentication;
