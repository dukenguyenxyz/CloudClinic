import React from 'react';
import StepOne from './StepOne';
// import StepTwo from './StepTwo';
import StepThree from './StepThree';
import '../Form/Form.scss';
import Button from '../../../Button/Button';

const Signup = () => {
  return (
    <>
      <div className="form-wrapper">
        <div className="trim" />
        <div className="form-container">
          <div className="form-header">
            <h1>Sign up</h1>
            <span>1/3</span>
          </div>

          <StepOne />
          {/* <StepTwo /> */}
          <Button action="Next" color="pink" />
        </div>
      </div>
      <div className="form-wrapper">
        <div className="trim" />
        <div className="form-container">
          <div className="form-header">
            <h1>Sign up</h1>
            <span>2/3</span>
          </div>

          {/* <StepTwo /> */}
          <StepThree />
          <Button action="Next" color="pink" />
        </div>
      </div>
    </>
  );
};

export default Signup;
