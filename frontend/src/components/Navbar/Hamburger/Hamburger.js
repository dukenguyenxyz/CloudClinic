import React from 'react';
import { Menu, X } from 'react-feather';
import './Hamburger.scss';

const Hamburger = ({ setIsOpen, isOpen }) => {
  return (
    <div className="hamburger-wrapper" onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? <X /> : <Menu />}
    </div>
  );
};

export default Hamburger;
