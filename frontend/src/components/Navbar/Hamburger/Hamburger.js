import React from 'react';
import { Menu, X } from 'react-feather';
import './Hamburger.scss';

const Hamburger = ({ setIsOpen, isOpen, cycleMenu }) => {
  const handleClick = () => {
    setIsOpen(!isOpen);
    cycleMenu();
  };

  return (
    <div className="hamburger-wrapper" onClick={() => handleClick()}>
      {isOpen ? <X /> : <Menu />}
    </div>
  );
};

export default Hamburger;
