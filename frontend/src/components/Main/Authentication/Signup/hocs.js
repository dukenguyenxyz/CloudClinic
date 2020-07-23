import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export const FormWrapper = props => {
  return (
    <div className="form-wrapper">
      <div className="trim" />
      <div className="form-container">{props.children}</div>
    </div>
  );
};

export const FormHeader = ({ title, step }) => {
  return (
    <div classNakme="form-header">
      <h1>{title}</h1>
      <span>{step}</span>
    </div>
  );
};

export const ErrorWrapper = ({ formState }) => {
  return (
    <div className="auth-error-wrapper">
      <ul>
        {formState.errors.map(errorMessage => (
          <li key={uuidv4()} className="auth-error-message">
            {errorMessage}
          </li>
        ))}
      </ul>
    </div>
  );
};
