import React, { useState, useEffect } from 'react';
import '../Form/Form.scss';
import AuthInput from '../Form/AuthInput/AuthInput';
import Button from '../../../Button/Button';

const Signin = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    errors: [],
  });

  const onValueChange = (e, key) => {
    setFormState({
      ...formState,
      errors: [],
      [key]: e.target.value,
    });
  };

  return (
    <div className="form-wrapper">
      <div className="trim" />
      <div className="form-container">
        <div className="form-header">
          <h1>Sign In</h1>
        </div>
        <div>
          <AuthInput
            value={formState.email}
            placeholder="Email"
            stateKey="email"
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
          />
        </div>
        <div className="auth-error-wrapper">
          <ul>
            {formState.errors.map((errorMessage, i) => (
              <li key={i} className="auth-error-message">
                {errorMessage}
              </li>
            ))}
          </ul>
        </div>
        <div className="form-button-wrapper">
          <Button
            action="Sign in"
            color="pink"
            // onClick={onNextStepZero}
            icon="logIn"
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
