import React from 'react';
import { Menu, X } from 'react-feather';
import './Hamburger.scss';

const Hamburger = () => {
  const flag = false;

  return <div className="hamburger-wrapper">{flag ? <Menu /> : <X />}</div>;
};

export default Hamburger;
