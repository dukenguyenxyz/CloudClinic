import React from 'react';
import './AuthInput.scss';
import { User, Lock, Mail, BookOpen } from 'react-feather';

const AuthInput = ({
  placeholder,
  value,
  onChange,
  handleKeyPress,
  type,
  icon,
  minLength,
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'username':
        return <User color="#212429" size={14} />;
      case 'password':
        return <Lock color="#212429" size={14} />;
      case 'email':
        return <Mail color="#212429" size={14} />;
      case 'education':
        return <BookOpen color="#212429" size={14} />;
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
        autoComplete="off"
        required
        minLength={minLength}
      />
    </div>
  );
};

export default AuthInput;
