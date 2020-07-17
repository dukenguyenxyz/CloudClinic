import React from 'react';
import '../Form/Form.scss';
import AuthInput from '../Form/AuthInput/AuthInput';

const StepTwo = () => {
  const basicInformationSignup = (
    <>
      <h3>Basic Information</h3>

      <AuthInput value="" placeholder="Title" type="text" icon="username" />
      <AuthInput value="" placeholder="Sex" type="text" />
      {/* This is the only field I'm not sure is relevant for a Doctor to input */}
      {/* Otherwise the basicInformationSignup form could be shared exactly the same for doctors and clients */}
      <AuthInput value="" placeholder="Weight" type="number" />
      <AuthInput value="" placeholder="Date of Birth" type="date" />
      <AuthInput
        value=""
        placeholder="Phone number"
        type="tel"
        pattern="[0-9]{10}"
      />

      <h3>Address</h3>
      <AuthInput value="" placeholder="Street No." type="number" />
      <AuthInput value="" placeholder="Street" type="text" />
      <AuthInput value="" placeholder="City" type="text" />
      <AuthInput value="" placeholder="Country" type="text" />
      <AuthInput value="" placeholder="Postcode" type="number" />
    </>
  );

  return (
    <div className="form-wrapper ">
      {/* <AuthInput value="hello" placeholder="" /> */}
      {/* <h1>Two</h1> */}
      {basicInformationSignup}
    </div>
  );
};

export default StepTwo;
