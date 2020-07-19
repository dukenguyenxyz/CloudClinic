import React from 'react';
import './Button.scss';
import { ArrowLeft, ArrowRight, ArrowDown, ArrowUp } from 'react-feather';

const Button = ({ action, color, icon }) => {
  const getIcon = () => {
    const iconSize = 20;

    switch (icon) {
      case 'arrowLeft':
        return <ArrowLeft size={iconSize} />;
      case 'arrowRight':
        return <ArrowRight size={iconSize} />;
      case 'arrowUp':
        return <ArrowUp size={iconSize} />;
      case 'arrowDown':
        return <ArrowDown size={iconSize} />;
      default:
        return null;
    }
  };

  return (
    <div className={`button-wrapper ${color}`}>
      <button type="button">
        <i>{getIcon()}</i>
        {action}
      </button>
    </div>
  );
};

export default Button;
