import React from 'react';
import '../Form/Form.scss';
import AuthInput from '../Form/AuthInput/AuthInput';
import AuthSelect from '../Form/AuthSelect/AuthSelect';
import countries from '../Form/countries';

const StepTwo = ({ formState, onValueChange }) => {
  const sexOptions = ['male', 'female'];
  const titleOptions = [
    '-',
    'Dr',
    'Mr',
    'Mrs',
    'Ms',
    'Miss',
    'Mx',
    'Rev',
    'Sir',
  ];

  const validatePasswords = () => {
    if (formState.password !== formState.confirmPassword) {
      //do something
    }
  };

  // console.log(formState);
  const basicInformationSignup = (
    <>
      <h3>Basic Information</h3>

      <AuthSelect
        value={formState.title}
        placeholder="Title"
        type="text"
        icon="username"
        options={titleOptions}
        onValueChange={e => onValueChange(e, 'title')}
      />
      <AuthInput
        value={formState.firstName}
        placeholder="First Name"
        type="text"
        icon="username"
        onValueChange={e => onValueChange(e, 'firstName')}
      />
      <AuthInput
        value={formState.lastName}
        placeholder="Last Name"
        type="text"
        icon="username"
        onValueChange={e => onValueChange(e, 'lastName')}
      />
      <AuthSelect
        value={formState.sex}
        placeholder="Sex"
        type="text"
        icon="users"
        options={sexOptions}
        onValueChange={e => onValueChange(e, 'sex')}
      />
      <AuthInput
        value={formState.weight}
        placeholder="Weight (kg)"
        type="number"
        icon="clipboard"
        onValueChange={e => onValueChange(e, 'weight')}
      />
      <AuthInput
        value={formState.dob}
        placeholder="Date of Birth"
        type="date"
        icon="calendar"
        isDate
        max="2020-01-01"
        min="1900-01-01"
        onValueChange={e => onValueChange(e, 'dob')}
      />
      <AuthInput
        value={formState.phone}
        placeholder="Mobile number"
        type="tel"
        pattern="[0-9]{10}"
        icon="phone"
        isMobile
        onValueChange={e => onValueChange(e, 'phone')}
        maxLength="12"
      />

      <h3>Address</h3>
      <AuthInput
        value={formState.addressNumber}
        placeholder="Street No."
        type="number"
        icon="hash"
        min="1"
        max="100000"
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
      <AuthSelect
        value={formState.country}
        placeholder="Country"
        type="text"
        icon="navArrow"
        options={countries}
        onValueChange={e => onValueChange(e, 'country')}
      />
      <AuthInput
        value={formState.postcode}
        placeholder="Postcode"
        type="number"
        icon="postcode"
        min="1"
        max="100000"
        onValueChange={e => onValueChange(e, 'postcode')}
      />
    </>
  );

  return <div>{basicInformationSignup}</div>;
};

export default StepTwo;
