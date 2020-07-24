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
        maxLength="20"
        onValueChange={e => onValueChange(e, 'username')}
        onKeyUp={onKeyUp}
      />
      <AuthInput
        value={formState.email}
        placeholder="Email"
        type="email"
        icon="email"
        maxLength="255"
        minLength="3"
        onValueChange={e => onValueChange(e, 'email')}
        onKeyUp={onKeyUp}
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
  return <>{clientSignup}</>;
};

export default StepOne;
