import React, { memo } from 'react';
import { v4 as uuidv4 } from 'uuid';

// RawFormWrapper
const RawFormWrapper = props => {
  return (
    <div className="form-wrapper">
      <div className="trim" />
      <div className="form-container">{props.children}</div>
    </div>
  );
};

function propsChildrenAreEqual(prevProps, nextProps) {
  return prevProps.children === nextProps.children;
}

export const FormWrapper = memo(RawFormWrapper, propsChildrenAreEqual);

// FormHeader
const RawFormHeader = props => {
  return (
    <div classNakme="form-header">
      <h1>{props.title}</h1>
      <span>{props.step}</span>
    </div>
  );
};

function propsHeaderAreEqual(prevProps, nextProps) {
  return (
    prevProps.title === nextProps.title && prevProps.step === nextProps.step
  );
}

export const FormHeader = memo(RawFormHeader, propsHeaderAreEqual);

// ErrorWrapper
const RawErrorWrapper = props => {
  return (
    <div className="auth-error-wrapper">
      <ul>
        {props.formState.errors.map(errorMessage => (
          <li key={uuidv4()} className="auth-error-message">
            {errorMessage}
          </li>
        ))}
      </ul>
    </div>
  );
};

function propsErrorAreEqual(prevProps, nextProps) {
  return prevProps.formState.errors === nextProps.formState.errors;
}

export const ErrorWrapper = memo(RawErrorWrapper, propsErrorAreEqual);
