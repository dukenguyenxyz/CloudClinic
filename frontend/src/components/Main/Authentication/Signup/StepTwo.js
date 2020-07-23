import React from 'react';
import '../Form/Form.scss';
import AuthInput from '../Form/AuthInput/AuthInput';
import AuthSelect from '../Form/AuthSelect/AuthSelect';
import countries from '../Form/countries';

const StepTwo = ({ formState, onValueChange, onKeyUp, onInput }) => {
  const sexOptions = ['male', 'female'];
  const titleOptions = ['Dr', 'Mr', 'Mrs', 'Ms', 'Miss', 'Mx', 'Rev', 'Sir'];

  const basicInformationSignup = (
    <>
      <h3>Basic Information</h3>

      <AuthSelect
        value={formState.title}
        placeholder="Title"
        type="text"
        directive="title"
        icon="username"
        minLength="3"
        maxLength="15"
        options={titleOptions}
        onValueChange={e => onValueChange(e, 'title')}
      />
      <AuthInput
        value={formState.firstName}
        placeholder="First Name"
        type="text"
        minLength="2"
        maxLength="26"
        icon="username"
        onValueChange={e => onValueChange(e, 'firstName')}
        onKeyUp={onKeyUp}
      />
      <AuthInput
        value={formState.lastName}
        placeholder="Last Name"
        type="text"
        minLength="2"
        maxLength="26"
        icon="username"
        onValueChange={e => onValueChange(e, 'lastName')}
        onKeyUp={onKeyUp}
      />
      <AuthSelect
        value={formState.sex}
        placeholder="Sex"
        type="text"
        icon="users"
        directive="sex"
        options={sexOptions}
        onValueChange={e => onValueChange(e, 'sex')}
      />
      <AuthInput
        value={formState.weight}
        placeholder="Weight (kg)"
        type="number"
        min="1"
        max="300"
        maxLength="3"
        icon="clipboard"
        onValueChange={e => onValueChange(e, 'weight')}
        onKeyUp={onKeyUp}
        onInput={onInput}
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
        onKeyUp={onKeyUp}
      />
      <AuthInput
        value={formState.phone}
        placeholder="Mobile number"
        type="tel"
        pattern="[0-9]{10}"
        icon="phone"
        isMobile
        onValueChange={e => onValueChange(e, 'phone')}
        minLength="9"
        maxLength="12"
        onKeyUp={onKeyUp}
      />

      <h3>Address</h3>
      <AuthInput
        value={formState.addressNumber}
        placeholder="Street No."
        type="text"
        icon="hash"
        minLength="1"
        maxLength="28"
        onValueChange={e => onValueChange(e, 'addressNumber')}
        onKeyUp={onKeyUp}
      />
      <AuthInput
        value={formState.street}
        placeholder="Street"
        type="text"
        icon="mapPin"
        minLength="2"
        maxLength="95"
        onValueChange={e => onValueChange(e, 'street')}
        onKeyUp={onKeyUp}
      />
      <AuthInput
        value={formState.city}
        placeholder="City"
        type="text"
        icon="home"
        minLength="2"
        maxLength="28"
        onValueChange={e => onValueChange(e, 'city')}
        onKeyUp={onKeyUp}
      />
      <AuthInput
        value={formState.state}
        placeholder="State"
        type="text"
        icon="postcode"
        minLength="2"
        maxLength="28"
        onValueChange={e => onValueChange(e, 'state')}
        onKeyUp={onKeyUp}
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
        maxLength="6"
        onValueChange={e => onValueChange(e, 'postcode')}
        onKeyUp={onKeyUp}
        onInput={onInput}
      />
    </>
  );

  return <div>{basicInformationSignup}</div>;
};

export default StepTwo;
