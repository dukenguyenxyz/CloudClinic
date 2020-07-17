import React from 'react';
import './Authentication.scss';
import Signup from './Signup/Signup';
import Signin from './Signin/Signin';
import Button from '../../Button/Button';

const Authentication = () => {
  const flag = true;
  return (
    <div>
      {flag ? <Signup /> : <Signin />}
      <Button action="Are you a doctor" color="dark" />
    </div>
  );
};

export default Authentication;
