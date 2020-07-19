import React from 'react';
import '../Form/Form.scss';
import AuthInput from '../Form/AuthInput/AuthInput';

const StepOne = () => {
  // To be replaced with API call from backend
  const isDoctor = false;

  const clientSignup = (
    <>
      <AuthInput
        value=""
        placeholder="Username"
        type="text"
        icon="username"
        minLength="3"
      />
      <AuthInput
        value=""
        placeholder="Email"
        type="email"
        icon="email"
        minLength="3"
      />
      {/* <AuthInput value="" placeholder="Last Name" type="text" icon="username" />  */}
      <AuthInput value="" placeholder="Email" type="email" icon="email" />
      <AuthInput
        value=""
        placeholder="Password"
        type="password"
        icon="password"
        minLength="6"
      />
      <AuthInput
        value=""
        placeholder="Confirm"
        type="password"
        icon="password"
        minLength="6"
      />
    </>
  );

  const doctorSignup = <h1>Im a doctor</h1>;
  return <>{isDoctor ? doctorSignup : clientSignup}</>;
};

export default StepOne;
