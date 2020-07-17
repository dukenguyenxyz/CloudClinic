import React from 'react';
import './AuthInput.scss';
import { User, Lock, Mail } from 'react-feather';

const AuthInput = ({
  placeholder,
  value,
  onChange,
  handleKeyPress,
  type,
  icon,
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'username':
        return <User color="black" size={14} />;
      case 'password':
        return <Lock color="black" size={14} />;
      case 'email':
        return <Mail color="black" size={14} />;
      default:
        return '';
    }
  };

  return (
    <div className="auth-input-wrapper">
      <label className={value ? 'active' : null} htmlFor={placeholder}>
        {placeholder}
      </label>
      <i>{getIcon()}</i>
      <input
        type={type}
        name={placeholder}
        value={value}
        onChange={onChange}
        onKeyUp={handleKeyPress}
      />
    </div>
  );
};

export default AuthInput;
