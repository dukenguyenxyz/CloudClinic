import React from 'react';
import './Button.scss';

const Button = ({ action, color }) => {
  return (
    <div className={`button-wrapper ${color}`}>
      <button type="button">{action}</button>
    </div>
  );
};

export default Button;
