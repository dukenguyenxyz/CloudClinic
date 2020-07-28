import React, { useContext, useEffect } from 'react';
import AuthInput from '../../Authentication/Form/AuthInput/AuthInput';
import AuthSelect from '../../Authentication/Form/AuthSelect/AuthSelect';
import countries from '../../Authentication/Form/countries';
import Button from '../../../Button/Button';
import languages from '../../Authentication/Form/languages';
// import { navigate } from '@reach/router';
import { AuthContext } from '../../../../globalState/index';
import axios from 'axios';
import { updateProfile } from '../../../AxiosTest/userRoutes';

const UpdateProfile = () => {
  const { user, setUser } = useContext(AuthContext);

  const sexOptions = ['male', 'female'];
  const titleOptions = ['Dr', 'Mr', 'Mrs', 'Ms', 'Miss', 'Mx', 'Rev', 'Sir'];
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const severityOptions = [1, 2, 3, 4, 5];

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
      [key]: targetObject,
    });
  };

  const onNestedArrValueChange = (e, key, i, subKey) => {
    const targetObject = user[key];
    targetObject[subKey][i] = e.target.value;

    setUser({
      ...user,
      [key]: targetObject,
    });
  };

  const onNestedArrObjValueChange = (e, key, subKey, i, objKey) => {
    const targetObject = user[key];
    targetObject[subKey][i][objKey] = e.target.value;

    setUser({
      ...user,
      [key]: targetObject,
    });
  };

  const handleRemoveClick = (key, i, subKey) => {
    const targetObject = user[key];
    targetObject[subKey].splice(i, 1);
    setUser({
      ...user,
      [key]: targetObject,
    });
  };

  const handleAddClick = (key, subKey) => {
    const targetObject = user[key];
    targetObject[subKey].push('');

    setUser({
      ...user,
      [key]: targetObject,
    });
  };

  const handleAddMultiClick = (key, subKey, obj) => {
    const targetObject = user[key];
    targetObject[subKey].push(obj);

    setUser({
      ...user,
      [key]: targetObject,
    });
  };

  const checkEmptyInputFields = key => {
    user.clientInfo[key].forEach(el => {
      const inputValues = Object.values(el);

      for (let i = 0; i < inputValues.length; i++) {
        if (!inputValues[i]) {
          setUser({
            ...user,
            errors: ['Please fill in all fields'],
          });
        }
      }
    });
  };

  //handler for submitting form
  const handleSubmit = async () => {
    if (
      !user.firstName ||
      !user.lastName ||
      !user.title ||
      !user.dateOfBirth ||
      !user.phoneNumber ||
      !user.address.number ||
      !user.address.state ||
      !user.address.street ||
      !user.address.city ||
      !user.country ||
      !user.postcode
    ) {
      setUser({
        ...user,
        errors: ['Please fill in all the inputs'],
      });
    }

    if (user.password !== user.confirmPassword) {
      setUser({
        ...user,
        errors: ['Passwords do not match'],
      });
    }

    if (!user.email.includes('@')) {
      setUser({
        ...user,
        errors: ['Please enter a valid email'],
      });
    }

    if (user.password !== '') {
      setUser({
        ...user,
        errors: ['Please enter a valid password'],
      });
    }

    if (user.doctorInfo) {
      if (!user.doctorInfo.licence && user.isDoctor) {
        setUser({
          ...user,
          errors: ['Please include a valid licence number'],
        });
      }

      if (!user.doctorInfo.accreditations && user.isDoctor) {
        setUser({
          ...user,
          errors: ['Please include a valid accreditation'],
        });
      }

      if (!user.doctorInfo.specialtyField && user.isDoctor) {
        setUser({
          ...user,
          errors: ['Please include a specialty field'],
        });
      }

      if (!user.doctorInfo.education && user.isDoctor) {
        setUser({
          ...user,
          errors: ['Please include your education'],
        });
      }

      if (!user.doctorInfo.yearsExp && user.isDoctor) {
        setUser({
          ...user,
          errors: ['Please include your years of experience'],
        });
      }

      if (!user.doctorInfo.languagesSpoken && user.isDoctor) {
        setUser({
          ...user,
          errors: ['Please include the languages you speak'],
        });
      }
    }

    if (user.clientInfo) {
      checkEmptyInputFields('medicalHistory');
      checkEmptyInputFields('allergies');
      checkEmptyInputFields('medication');

      if (!user.clientInfo.bloodType && !user.isDoctor) {
        setUser({
          ...user,
          errors: ['Please include your blood type'],
        });
      }

      if (!user.clientInfo.weight && !user.isDoctor) {
        setUser({
          ...user,
          errors: ['Please include your weight'],
        });
      }
    }

    const developmentUrl = 'http://localhost:5000';
    // const productionUrl = 'http://cloudclinic.tech';
    const endpoint = `${developmentUrl}/api/users/profile`;
    axios.defaults.headers.patch['Content-Type'] = 'application/json';
    const jwt = localStorage.getItem('jwt');

    //if user errors is falsy, i.e. no errors, make axios patch request
    if (!user.errors) {
      // Make axios post request to backend
      // axios
      //   .patch(endpoint, user, {
      //     headers: {
      //       Authorization: jwt,
      //       'Content-Type': 'application/json; charset=utf-8',
      //     },
      //   })
      //   .then(response => {
      //     console.log(response.data.user);
      //     const user = response.data.user;
      //     setUser(user);
      //     navigate('/profile');
      //   })
      //   .catch(error => {
      //     console.log(error.response);
      //     {
      //       user.errors
      //         ? setUser({
      //             ...user,
      //             errors: [...user.errors, `${error.response.data}`],
      //           })
      //         : setUser({
      //             ...user,
      //             errors: [`${error.response.data}`],
      //           });
      //     }
      //   });
    }
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
        onValueChange={e => onValueChange(e, 'dateOfBirth')}
      />
      <AuthInput
        value={user.phoneNumber}
        placeholder="Mobile number"
        type="tel"
        pattern="[0-9]{10}"
        icon="phone"
        isMobile
        onValueChange={e => onValueChange(e, 'phoneNumber')}
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
                  value={val}
                  placeholder="Accreditation"
                  type="text"
                  maxLength="30"
                  icon="briefcase"
                  onValueChange={e =>
                    onNestedArrValueChange(e, 'doctorInfo', i, 'accreditations')
                  }
                />
                <div className="btn-box">
                  {user.doctorInfo.accreditations.length !== 1 && (
                    <Button
                      onClick={() =>
                        handleRemoveClick('doctorInfo', i, 'accreditations')
                      }
                      icon="minus"
                      color="mid"
                    />
                  )}
                  {user.doctorInfo.accreditations.length - 1 === i && (
                    <Button
                      onClick={() =>
                        user.doctorInfo.accreditations[i] !== '' &&
                        handleAddClick('doctorInfo', 'accreditations')
                      }
                      icon="plus"
                      color="mid"
                    />
                  )}
                </div>
              </div>
            );
          })}
          <AuthInput
            value={user.doctorInfo.specialtyField}
            placeholder="Specialty Field"
            type="text"
            maxLength="30"
            icon="fileText"
            onValueChange={e =>
              onNestedValueChange(e, 'doctorInfo', 'specialtyField')
            }
          />
          <AuthInput
            value={user.doctorInfo.subSpecialtyField}
            placeholder="Sub Specialty Field"
            type="text"
            maxLength="30"
            icon="fileText"
            onValueChange={e =>
              onNestedValueChange(e, 'doctorInfo', 'subSpecialtyField')
            }
          />
          {user.doctorInfo.education.map((val, i) => {
            return (
              <div key={i} className="auth-multi">
                <AuthInput
                  name="education"
                  value={val}
                  placeholder="Education"
                  type="text"
                  maxLength="30"
                  icon="briefcase"
                  onValueChange={e =>
                    onNestedArrValueChange(e, 'doctorInfo', i, 'education')
                  }
                />
                <div className="btn-box">
                  {user.doctorInfo.education.length !== 1 && (
                    <Button
                      onClick={() =>
                        handleRemoveClick('doctorInfo', i, 'education')
                      }
                      icon="minus"
                      color="mid"
                    />
                  )}
                  {user.doctorInfo.education.length - 1 === i && (
                    <Button
                      onClick={() =>
                        user.doctorInfo.education[i] !== '' &&
                        handleAddClick('doctorInfo', 'education')
                      }
                      icon="plus"
                      color="mid"
                    />
                  )}
                </div>
              </div>
            );
          })}
          <AuthInput
            value={user.doctorInfo.yearsExperience}
            placeholder="Years of Experience"
            type="number"
            icon="hash"
            maxLength="2"
            onValueChange={e =>
              onNestedValueChange(e, 'doctorInfo', 'yearsExperience')
            }
          />
          {user.doctorInfo.languagesSpoken.map((val, i) => {
            return (
              <div key={i} className="auth-multi">
                <AuthSelect
                  value={val}
                  placeholder="Language"
                  type="text"
                  directive="language"
                  icon="language"
                  options={languages}
                  onValueChange={e =>
                    onNestedArrValueChange(
                      e,
                      'doctorInfo',
                      i,
                      'languagesSpoken'
                    )
                  }
                />
                <div className="btn-box">
                  {user.doctorInfo.languagesSpoken.length !== 1 && (
                    <Button
                      onClick={() =>
                        handleRemoveClick('doctorInfo', i, 'languagesSpoken')
                      }
                      icon="minus"
                      color="mid"
                    />
                  )}
                  {user.doctorInfo.languagesSpoken.length - 1 === i && (
                    <Button
                      onClick={() =>
                        user.doctorInfo.languagesSpoken[i] !== '' &&
                        handleAddClick('doctorInfo', 'languagesSpoken')
                      }
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
          <h3>Existing Conditions</h3>
          {user.clientInfo.medicalHistory.map((val, i) => {
            return (
              <div key={i}>
                <AuthInput
                  name="condition"
                  value={val.condition}
                  placeholder="Condition"
                  type="text"
                  maxLength="30"
                  icon="condition"
                  onValueChange={e =>
                    onNestedArrObjValueChange(
                      e,
                      'clientInfo',
                      'medicalHistory',
                      i,
                      'condition'
                    )
                  }
                />
                <AuthInput
                  name="conditionStartDate"
                  value={val.startDate}
                  type="date"
                  icon="calendar"
                  placeholder="Start date"
                  isDate
                  max="2020-01-01"
                  min="1900-01-01"
                  onValueChange={e =>
                    onNestedArrObjValueChange(
                      e,
                      'clientInfo',
                      'medicalHistory',
                      i,
                      'startDate'
                    )
                  }
                />
                <AuthInput
                  name="conditionComment"
                  value={val.notes}
                  placeholder="Comments"
                  type="text"
                  maxLength="100"
                  icon="textArea"
                  onValueChange={e =>
                    onNestedArrObjValueChange(
                      e,
                      'clientInfo',
                      'medicalHistory',
                      i,
                      'notes'
                    )
                  }
                />
                <div className="btn-box">
                  {user.clientInfo.medicalHistory.length !== 1 && (
                    <Button
                      onClick={() =>
                        handleRemoveClick('clientInfo', i, 'medicalHistory')
                      }
                      icon="minus"
                      color="mid"
                    />
                  )}
                  {user.clientInfo.medicalHistory.length - 1 === i && (
                    <Button
                      onClick={() =>
                        user.clientInfo.medicalHistory[i] !== '' &&
                        handleAddMultiClick('clientInfo', 'medicalHistory', {
                          condition: '',
                          startDate: '',
                          notes: '',
                        })
                      }
                      icon="plus"
                      color="mid"
                    />
                  )}
                </div>
              </div>
            );
          })}

          <h3>Allergies</h3>

          {user.clientInfo.allergies.map((val, i) => {
            return (
              <div key={i}>
                <AuthInput
                  name="allergy"
                  value={val.name}
                  placeholder="Allergy"
                  type="text"
                  maxLength="30"
                  icon="alertCircle"
                  onValueChange={e =>
                    onNestedArrObjValueChange(
                      e,
                      'clientInfo',
                      'allergies',
                      i,
                      'name'
                    )
                  }
                />

                <AuthSelect
                  name="severity"
                  value={val.severity}
                  placeholder="Severity"
                  type="text"
                  icon="hash"
                  directive="allergy"
                  options={severityOptions}
                  onValueChange={e =>
                    onNestedArrObjValueChange(
                      e,
                      'clientInfo',
                      'allergies',
                      i,
                      'severity'
                    )
                  }
                />
                <div className="btn-box">
                  {user.clientInfo.allergies.length !== 1 && (
                    <Button
                      onClick={() =>
                        handleRemoveClick('clientInfo', i, 'allergies')
                      }
                      icon="minus"
                      color="mid"
                    />
                  )}
                  {user.clientInfo.allergies.length - 1 === i && (
                    <Button
                      onClick={() =>
                        user.clientInfo.medicalHistory[i] !== '' &&
                        handleAddMultiClick('clientInfo', 'allergies', {
                          name: '',
                          severity: '',
                        })
                      }
                      icon="plus"
                      color="mid"
                    />
                  )}
                </div>
              </div>
            );
          })}

          <h3>Medication</h3>

          {user.clientInfo.medication.map((val, i) => {
            return (
              <div key={i}>
                <AuthInput
                  name="medication"
                  value={val.name}
                  placeholder="Medication"
                  type="text"
                  icon="medication"
                  maxLength="30"
                  onValueChange={e =>
                    onNestedArrObjValueChange(
                      e,
                      'clientInfo',
                      'medication',
                      i,
                      'name'
                    )
                  }
                />
                <AuthInput
                  name="dosage"
                  value={val.dosage}
                  placeholder="Dosage (mg)"
                  type="number"
                  min="1"
                  max="5000"
                  maxLength="4"
                  icon="hash"
                  onValueChange={e =>
                    onNestedArrObjValueChange(
                      e,
                      'clientInfo',
                      'medication',
                      i,
                      'dosage'
                    )
                  }
                />
                <AuthInput
                  name="manufacturer"
                  value={val.manufacturer}
                  placeholder="Manufacturer"
                  type="text"
                  icon="briefcase"
                  maxLength="30"
                  onValueChange={e =>
                    onNestedArrObjValueChange(
                      e,
                      'clientInfo',
                      'medication',
                      i,
                      'manufacturer'
                    )
                  }
                />
                <div className="btn-box">
                  {user.clientInfo.medication.length !== 1 && (
                    <Button
                      onClick={() =>
                        handleRemoveClick('clientInfo', i, 'medication')
                      }
                      icon="minus"
                      color="mid"
                    />
                  )}
                  {user.clientInfo.medication.length - 1 === i && (
                    <Button
                      onClick={() =>
                        user.clientInfo.medicalHistory[i] !== '' &&
                        handleAddMultiClick('clientInfo', 'medication', {
                          name: '',
                          dosage: '',
                          manufacturer: '',
                        })
                      }
                      icon="plus"
                      color="mid"
                    />
                  )}
                </div>
              </div>
            );
          })}

          <h3>Blood Type & Weight</h3>

          <AuthSelect
            value={user.clientInfo.bloodType}
            placeholder="Blood Type"
            icon="heart"
            directive="blood"
            options={bloodTypes}
            onValueChange={e =>
              onNestedValueChange(e, 'clientInfo', 'bloodType')
            }
          />
          <AuthInput
            value={user.clientInfo.weight}
            placeholder="Weight (kg)"
            type="number"
            min="1"
            max="300"
            maxLength="3"
            icon="clipboard"
            onValueChange={e => onNestedValueChange(e, 'clientInfo', 'weight')}
          />
        </>
      )}
      <Button
        action="Update"
        color="pink"
        onClick={handleSubmit}
        icon="check"
      />
    </div>
  );
};

export default UpdateProfile;
