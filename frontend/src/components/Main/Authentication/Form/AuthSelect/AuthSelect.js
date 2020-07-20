import React from 'react';
import './AuthSelect.scss';
import { Heart, Users, Hash } from 'react-feather';

const AuthSelect = ({ placeholder, value, onValueChange, icon, options }) => {
  const getIcon = () => {
    switch (icon) {
      case 'heart':
        return <Heart color="#212429" size={14} />;
      case 'users':
        return <Users color="#212429" size={14} />;
      case 'hash':
        return <Hash color="#212429" size={14} />;
      default:
        return '';
    }
  };

  const makeSelectItem = item => {
    return <option value={item}>{item}</option>;
  };

  return (
    <div className="auth-select-wrapper">
      <i>{getIcon()}</i>
      <select name={placeholder} value={value} onChange={onValueChange}>
        {options.map(makeSelectItem)}
      </select>
    </div>
  );
};

export default AuthSelect;
