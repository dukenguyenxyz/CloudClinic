import React, { useContext, useEffect } from 'react';
import AuthInput from '../../Authentication/Form/AuthInput/AuthInput';
import AuthSelect from '../../Authentication/Form/AuthSelect/AuthSelect';
import countries from '../../Authentication/Form/countries';
import Button from '../../../Button/Button';

import { AuthContext } from '../../../../globalState/index';
import axios from 'axios';

const UpdateProfile = () => {
  const { user, setUser } = useContext(AuthContext);

  const sexOptions = ['male', 'female'];
  const titleOptions = ['Dr', 'Mr', 'Mrs', 'Ms', 'Miss', 'Mx', 'Rev', 'Sir'];

  const onValueChange = (e, key) => {
    setUser({
      ...user,
      // errors: [],
      [key]: e.target.value,
    });
  };

  const onNestedValueChange = (e, key, subKey) => {
    const targetObject = user[key];
    targetObject[subKey] = e.target.value;

    setUser({
      ...user,
      // user.address: e.target.value;
      [key]: targetObject,
    });
  };

  return (
    <div className="update-profile-wrapper">
      <h1>Update Profile</h1>
      <h2>Login Details</h2>
      <AuthInput
        value={user.username}
        placeholder="Username"
        type="text"
        icon="username"
        minLength="3"
        maxLength="20"
        onValueChange={e => onValueChange(e, 'username')}
      />
      <AuthInput
        value={user.email}
        placeholder="Email"
        type="email"
        icon="email"
        maxLength="255"
        minLength="3"
        onValueChange={e => onValueChange(e, 'email')}
      />
      <AuthInput
        value={user.password}
        placeholder="Password"
        type="password"
        icon="password"
        minLength="6"
        onValueChange={e => onValueChange(e, 'password')}
        // validationIcon={formState.validationIcon}
      />
      <AuthInput
        value={user.confirmPassword}
        placeholder="Confirm"
        type="password"
        icon="password"
        minLength="6"
        onValueChange={e => onValueChange(e, 'confirmPassword')}
        // validationIcon={formState.validationIcon}
      />
      <h2>Basic Information</h2>
      <AuthSelect
        value={user.title}
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
        value={user.firstName}
        placeholder="First Name"
        type="text"
        minLength="2"
        maxLength="26"
        icon="username"
        onValueChange={e => onValueChange(e, 'firstName')}
      />
      <AuthInput
        value={user.lastName}
        placeholder="Last Name"
        type="text"
        minLength="2"
        maxLength="26"
        icon="username"
        onValueChange={e => onValueChange(e, 'lastName')}
      />
      <AuthSelect
        value={user.sex}
        placeholder="Sex"
        type="text"
        icon="users"
        directive="sex"
        options={sexOptions}
        onValueChange={e => onValueChange(e, 'sex')}
      />
      <AuthInput
        value={user.dateOfBirth}
        placeholder="Date of Birth"
        type="date"
        icon="calendar"
        isDate
        max="2020-01-01"
        min="1900-01-01"
        onValueChange={e => onValueChange(e, 'dob')}
      />
      <AuthInput
        value={user.phoneNumber}
        placeholder="Mobile number"
        type="tel"
        pattern="[0-9]{10}"
        icon="phone"
        isMobile
        onValueChange={e => onValueChange(e, 'phone')}
        minLength="9"
        maxLength="12"
      />
      <h3>Address</h3>
      <AuthInput
        value={user.address.number}
        placeholder="Street No."
        type="text"
        icon="hash"
        minLength="1"
        maxLength="28"
        onValueChange={e => onNestedValueChange(e, 'address', 'number')}
      />
      <AuthInput
        value={user.address.street}
        placeholder="Street"
        type="text"
        icon="mapPin"
        minLength="2"
        maxLength="95"
        onValueChange={e => onNestedValueChange(e, 'address', 'street')}
      />
      <AuthInput
        value={user.address.city}
        placeholder="City"
        type="text"
        icon="home"
        minLength="2"
        maxLength="28"
        onValueChange={e => onNestedValueChange(e, 'address', 'city')}
      />
      <AuthInput
        value={user.address.state}
        placeholder="State"
        type="text"
        icon="postcode"
        minLength="2"
        maxLength="28"
        onValueChange={e => onNestedValueChange(e, 'address', 'state')}
      />
      <AuthSelect
        value={user.address.country}
        placeholder="Country"
        type="text"
        icon="navArrow"
        options={countries}
        onValueChange={e => onNestedValueChange(e, 'address', 'country')}
      />
      <AuthInput
        value={user.address.postcode}
        placeholder="Postcode"
        type="number"
        icon="postcode"
        min="1"
        max="100000"
        maxLength="6"
        onValueChange={e => onNestedValueChange(e, 'address', 'postcode')}
        // onInput={onInput}
      />
      {user.isDoctor ? (
        <>
          <h2>Medical Licencing & Accreditation</h2>
          {console.log('Medical licence')}
          <AuthInput
            value={user.licence}
            placeholder="Licence"
            type="text"
            maxLength="30"
            icon="licence"
            onValueChange={e => onValueChange(e, 'licence')}
          />
          {user.doctorInfo.accreditations.map((val, i) => {
            console.log('Mapping of accreditations');
            return (
              <div key={i} className="auth-multi">
                <AuthInput
                  name="accreditation"
                  // value={val.accreditation}
                  value={val}
                  placeholder="Accreditation"
                  type="text"
                  maxLength="30"
                  icon="briefcase"
                  // onValueChange={e =>
                  //   onArrValueChange(e, 'accreditations', i, 'accreditation')
                  // }
                />
                <div className="btn-box">
                  {user.doctorInfo.accreditations.length !== 1 && (
                    <Button
                      // onClick={() => handleRemoveClick('accreditations', i)}
                      icon="minus"
                      color="mid"
                    />
                  )}
                  {user.doctorInfo.accreditations.length - 1 === i && (
                    <Button
                      // onClick={() =>
                      //   user.doctorInfo.accreditations[i] !== '' &&
                      //   handleAddClick('accreditations', {
                      //     accreditation: '',
                      //   })
                      // }
                      icon="plus"
                      color="mid"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <>
          <h2>Medical Information</h2>
          <AuthInput
            value={user.clientInfo.weight}
            placeholder="Weight (kg)"
            type="number"
            min="1"
            max="300"
            maxLength="3"
            icon="clipboard"
            // onValueChange={e => onValueChange(e, 'weight')}
            // onInput={onInput}
          />
        </>
      )}
    </div>
  );
};

export default UpdateProfile;
