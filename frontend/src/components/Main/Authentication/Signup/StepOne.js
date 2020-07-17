import React from 'react';
import '../Form/Form.scss';
import AuthInput from '../Form/AuthInput/AuthInput';

const StepOne = () => {
  const isDoctor = false;

  const clientSignup = (
    <>
      <AuthInput value="" placeholder="Username" type="text" icon="username" />
      {/* <AuthInput
        value=""
        placeholder="First Name"
        type="text"
        icon="username"
      />
      <AuthInput value="" placeholder="Last Name" type="text" icon="username" /> */}
      <AuthInput value="" placeholder="Email" type="email" icon="email" />
      <AuthInput
        value=""
        placeholder="Password"
        type="password"
        icon="password"
      />
      <AuthInput
        value=""
        placeholder="Confirm"
        type="password"
        icon="password"
      />
    </>
  );

  const doctorSignup = <h1>Im a doctor</h1>;
  return <>{isDoctor ? doctorSignup : clientSignup}</>;
};

export default StepOne;
