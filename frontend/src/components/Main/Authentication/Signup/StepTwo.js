import React from 'react';
import '../Form/Form.scss';
import AuthInput from '../Form/AuthInput/AuthInput';
import AuthSelect from '../Form/AuthSelect/AuthSelect';

const StepTwo = ({ formState, onValueChange }) => {
  const options = ['male', 'female'];

  // console.log(formState);
  const basicInformationSignup = (
    <>
      <h3>Basic Information</h3>

      <AuthInput
        value={formState.title}
        placeholder="Title"
        type="text"
        icon="username"
        onValueChange={e => onValueChange(e, 'title')}
      />
      <AuthSelect
        value={formState.sex}
        placeholder="Sex"
        type="text"
        icon="users"
        options={options}
        onValueChange={e => onValueChange(e, 'sex')}
      />
      {/* Relevant input for Doctor form? */}
      <AuthInput
        value={formState.weight}
        placeholder="Weight"
        type="number"
        icon="clipboard"
        onValueChange={e => onValueChange(e, 'weight')}
      />
      {/* Date of Birth input - needs formatting for Date Picker input */}
      <AuthInput
        value={formState.dob}
        // placeholder="Date of Birth"
        type="date"
        icon="calendar"
        onValueChange={e => onValueChange(e, 'dob')}
      />
      <AuthInput
        value={formState.phone}
        placeholder="Phone number"
        type="tel"
        pattern="[0-9]{10}"
        icon="phone"
        onValueChange={e => onValueChange(e, 'phone')}
      />

      <h3>Address</h3>
      <AuthInput
        value={formState.addressNumber}
        placeholder="Street No."
        type="number"
        icon="hash"
        onValueChange={e => onValueChange(e, 'addressNumber')}
      />
      <AuthInput
        value={formState.street}
        placeholder="Street"
        type="text"
        icon="mapPin"
        onValueChange={e => onValueChange(e, 'street')}
      />
      <AuthInput
        value={formState.city}
        placeholder="City"
        type="text"
        icon="home"
        onValueChange={e => onValueChange(e, 'city')}
      />
      <AuthInput
        value={formState.country}
        placeholder="Country"
        type="text"
        icon="navArrow"
        onValueChange={e => onValueChange(e, 'country')}
      />
      <AuthInput
        value={formState.postcode}
        placeholder="Postcode"
        type="number"
        icon="hash"
        onValueChange={e => onValueChange(e, 'postcode')}
      />
    </>
  );

  return <div className="form-wrapper ">{basicInformationSignup}</div>;
};

export default StepTwo;
