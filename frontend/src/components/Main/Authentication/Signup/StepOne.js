import React from 'react';
import '../Form/Form.scss';
import AuthInput from '../Form/AuthInput/AuthInput';

const StepOne = ({ formState, onValueChange, onKeyUp }) => {
  const clientSignup = (
    <>
      <AuthInput
        value={formState.email}
        placeholder="Email"
        type="email"
        icon="email"
        maxLength="255"
        minLength="3"
        onValueChange={e => onValueChange(e, 'email')}
        onKeyUp={onKeyUp}
        dataCypress="email"
      />
      <AuthInput
        value={formState.password}
        placeholder="Password"
        type="password"
        icon="password"
        minLength="6"
        onValueChange={e => onValueChange(e, 'password')}
        validationIcon={formState.validationIcon}
        onKeyUp={onKeyUp}
        dataCypress="password"
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
        dataCypress="confirm"
      />
    </>
  );
  return <>{clientSignup}</>;
};

export default StepOne;
