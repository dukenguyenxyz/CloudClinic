import React from 'react';
import './Button.scss';
import {
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  Check,
  Plus,
  Minus,
  LogIn,
  LogOut,
  X,
  UploadCloud,
} from 'react-feather';

const Button = ({ action, color, icon, onClick, dataCypress }) => {
  const getIcon = () => {
    const iconSize = 20;
    const iconSizeSmall = 16;

    switch (icon) {
      case 'arrowLeft':
        return <ArrowLeft size={iconSize} />;
      case 'arrowRight':
        return <ArrowRight size={iconSize} />;
      case 'arrowUp':
        return <ArrowUp size={iconSize} />;
      case 'arrowDown':
        return <ArrowDown size={iconSize} />;
      case 'check':
        return <Check size={iconSize} />;
      case 'cross':
        return <X size={iconSize} />;
      case 'plus':
        return <Plus size={iconSizeSmall} />;
      case 'minus':
        return <Minus size={iconSizeSmall} />;
      case 'logIn':
        return <LogIn size={iconSizeSmall} />;
      case 'logOut':
        return <LogOut size={iconSizeSmall} />;
      case 'logOutLarge':
        return <LogOut size={iconSize} />;
      case 'uploadCloud':
        return <UploadCloud size={iconSize} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`button-wrapper ${color} ${icon === 'minus' ? 'minus' : ''}`}
    >
      <button type="button" onClick={onClick} data-cy={dataCypress}>
        {icon === 'arrowLeft' && <i>{getIcon()}</i>}
        {icon === 'plus' && <i>{getIcon()}</i>}
        {icon === 'minus' && <i>{getIcon()}</i>}
        {action && <span>{action}</span>}
        {icon === 'arrowRight' && <i>{getIcon()}</i>}
        {icon === 'check' && <i>{getIcon()}</i>}
        {icon === 'cross' && <i>{getIcon()}</i>}
        {icon === 'logIn' && <i>{getIcon()}</i>}
        {icon === 'logOut' && <i>{getIcon()}</i>}
        {icon === 'logOutLarge' && <i>{getIcon()}</i>}
        {icon === 'uploadCloud' && <i>{getIcon()}</i>}
      </button>
    </div>
  );
};

export default Button;
