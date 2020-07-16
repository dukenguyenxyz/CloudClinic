import React from 'react';
import './Logo.scss';
import CloudClinicLogo from '../../../assets/cloudclinic-logo.svg';

const Logo = () => {
  return (
    <div className="logo-wrapper">
      <img src={CloudClinicLogo} alt="CloudClinic Logo" className="logo" />
    </div>
  );
};

export default Logo;
