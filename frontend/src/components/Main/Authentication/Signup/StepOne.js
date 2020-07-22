import React from 'react';
import '../Form/Form.scss';
import AuthInput from '../Form/AuthInput/AuthInput';

const StepOne = ({ formState, onValueChange, onKeyUp }) => {
  const isDoctor = false;
  const clientSignup = (
    <>
      <AuthInput
        value={formState.username}
        placeholder="Username"
        type="text"
        icon="username"
        minLength="3"
        onValueChange={e => onValueChange(e, 'username')}
      />
      <AuthInput
        value={formState.email}
        placeholder="Email"
        type="email"
        icon="email"
        minLength="3"
        onValueChange={e => onValueChange(e, 'email')}
      />
      <AuthInput
        value={formState.password}
        placeholder="Password"
        type="password"
        icon="password"
        minLength="6"
        onValueChange={e => onValueChange(e, 'password')}
        validationIcon={formState.validationIcon}
      />
      <AuthInput
        value={formState.confirmPassword}
        placeholder="Confirm"
        type="password"
        icon="password"
        minLength="6"
        onValueChange={e => onValueChange(e, 'confirmPassword')}
        validationIcon={formState.validationIcon}
        onKeyUp={onKeyUp}
      />
    </>
  );

  // const doctorSignup = <h1>Im a doctor</h1>;
  // return <>{isDoctor ? doctorSignup : clientSignup}</>;
  return <>{clientSignup}</>;
};

export default StepOne;
