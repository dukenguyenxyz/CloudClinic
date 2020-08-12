import React, { useState, useEffect } from 'react';
import './Authentication.scss';
import Signup from './Signup/Signup';
import Signin from './Signin/Signin';
import Button from '../../Button/Button';

const Authentication = ({ location }) => {
  const [authAction, setAuthAction] = useState(false);
  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    // if jwt exists and is valid, set auth action to true to return the sign in view
    if (jwt) {
      setAuthAction(true);
    }

    // we get true or false value from location.state.signIn based on the state prop from either the sign in or sign up Link component
    // see Link component in home component if confused
    if (location.state) {
      setAuthAction(location.state.signIn);
    }
  }, [jwt, location]);

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
