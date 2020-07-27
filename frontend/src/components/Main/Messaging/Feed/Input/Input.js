import React from 'react';
import './Input.scss';
import Button from '../../../../Button/Button';
const Input = () => {
  return (
    <div className="messaging-input-wrapper">
      <input type="text" placeholder="Type in your message" />
      <Button action="Submit" color="navy" />
    </div>
  );
};

export default Input;
