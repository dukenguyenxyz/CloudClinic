import React, { useState, useEffect } from 'react';
import StepZero from './StepZero';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import '../Form/Form.scss';
import Button from '../../../Button/Button';
import { v4 as uuidv4 } from 'uuid';

const Signup = () => {
  const [formState, setFormState] = useState({
    step: 0,
    isDoctor: false,
    errors: [],
    validationIcon: '',
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    title: '',
    sex: '',
    weight: '',
    dob: '',
    phone: '+61',
    addressNumber: '',
    street: '',
    city: '',
    country: 'Australia',
    postcode: '',
    existingConditions: [
      { condition: '', conditionStartDate: '', conditionComment: '' },
    ],
    allergies: [{ allergy: '', severity: '' }],
    medications: [{ medication: '', dosage: '', manufacturer: '' }],
    bloodType: '',
    //Doctor states
    licence: '',
    accreditation: '',
    specialtyField: '',
    subSpecialtyField: '',
    education: '',
    yearsExp: '',
    languages: [{ language: '' }],
  });

  const onNextStepOne = () => {
    if (
      !formState.password ||
      !formState.confirmPassword ||
      !formState.username ||
      !formState.email
      // !formState.firstName ||
      // !formState.lastName ||
      // !formState.title ||
      // !formState.weight ||
      // !formState.dob ||
      // !formState.phone ||
      // !formState.addressNumber ||
      // !formState.street ||
      // !formState.city ||
      // !formState.country
    ) {
      setFormState({
        ...formState,
        errors: ['Please fill in all the inputs'],
      });
    } else if (formState.password !== formState.confirmPassword) {
      setFormState({
        ...formState,
        errors: ['Passwords do not match'],
      });
    } else if (!formState.email.includes('@')) {
      setFormState({
        ...formState,
        errors: ['Please enter a valid email'],
      });
    } else if (
      formState.password === formState.confirmPassword &&
      formState.password !== ''
    ) {
      setFormState({
        ...formState,
        step: formState.step + 1,
      });
    }
  };
  const onNextStepTwo = () => {
    if (
      !formState.firstName ||
      !formState.lastName ||
      !formState.title ||
      !formState.weight ||
      !formState.dob ||
      !formState.phone ||
      !formState.addressNumber ||
      !formState.street ||
      !formState.city ||
      !formState.country
    ) {
      setFormState({
        ...formState,
        errors: ['Please fill in all the inputs'],
      });
    } else if (formState.password !== formState.confirmPassword) {
      setFormState({
        ...formState,
        errors: ['Passwords do not match'],
      });
    } else if (!formState.email.includes('@')) {
      setFormState({
        ...formState,
        errors: ['Please enter a valid email'],
      });
    } else if (
      formState.password === formState.confirmPassword &&
      formState.password !== ''
    ) {
      setFormState({
        ...formState,
        step: formState.step + 1,
      });
    }
  };

  const onPrev = () => {
    setFormState({
      ...formState,
      step: formState.step - 1,
    });
  };

  useEffect(() => {
    if (
      //password and confirm password match
      formState.password === formState.confirmPassword &&
      formState.password.length > 0
    ) {
      setFormState({
        ...formState,
        validationIcon: 'success',
      });

      //password and confirm password are not the same
    } else if (
      formState.password !== formState.confirmPassword &&
      formState.password.length === formState.confirmPassword.length
    ) {
      setFormState({
        ...formState,
        errors: ['Passwords do not match'],
        validationIcon: 'error',
      });
    }
  }, [formState.password, formState.confirmPassword]);

  const onValueChange = (e, key) => {
    setFormState({
      ...formState,
      errors: [],
      [key]: e.target.value,
    });
  };

  const handleCheckBox = (e, key) => {
    setFormState({
      ...formState,
      [key]: e.target.checked,
    });
  };

  const onArrValueChange = (e, key, i, subKey) => {
    const list = [...formState[key]];
    list[i][subKey] = e.target.value;

    setFormState({
      ...formState,
      [key]: list,
    });
  };

  //Handlers for adding/removing extra form fields
  const handleRemoveClick = (key, i) => {
    //spread value at the formState key into list
    const list = [...formState[key]];
    //at index i, remove one item
    list.splice(i, 1);
    setFormState({
      ...formState,
      [key]: list,
    });
  };

  //key param refers to which key to reference e.g. existingConditions
  //stateFields is the object that is needed to be put into the array
  //e.g. formFieldsObject = { condition: '', conditionStartDate: '', conditionComment: '' }
  const handleAddClick = (key, formFieldsObject) => {
    setFormState({
      ...formState,
      [key]: [...formState[key], formFieldsObject],
    });
  };

  //handler for submitting form
  const handleSubmit = e => {
    // e.preventDefault();
    //Make axios post request to backend
    // axios.post('/user,{
    //   ...formState
    // })
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
    //then a redirect?
  };

  // Handle enter key callback to advance the form - placed on last input field of each form step
  const handleEnterKey = e => {
    if (e.keyCode === 13 && formState.step === 1) {
      onNextStepOne();
    }

    if (e.keyCode === 13 && formState.step === 2) {
      onNextStepTwo();
    }
  };

  const displayFormStep = () => {
    console.log(formState);
    switch (formState.step) {
      case 0:
        return (
          <div className="form-wrapper">
            <div className="trim" />
            <div className="form-container">
              <div className="form-header">
                <h1>Sign up</h1>
                <span>1/4</span>
              </div>
              <StepZero formState={formState} handleCheckBox={handleCheckBox} />
              <div className="auth-error-wrapper">
                <ul>
                  {formState.errors.map(errorMessage => (
                    <li key={uuidv4()} className="auth-error-message">
                      {errorMessage}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="form-button-wrapper">
                <Button
                  action="Next"
                  color="pink"
                  onClick={onNextStepOne}
                  icon="arrowRight"
                />
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="form-wrapper">
            <div className="trim" />
            <div className="form-container">
              <div className="form-header">
                <h1>Sign up</h1>
                <span>2/4</span>
              </div>
              <StepOne
                formState={formState}
                onValueChange={onValueChange}
                onKeyUp={handleEnterKey}
              />
              <div className="auth-error-wrapper">
                <ul>
                  {formState.errors.map(errorMessage => (
                    <li key={uuidv4()} className="auth-error-message">
                      {errorMessage}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="form-button-wrapper">
                <div className="form-button-wrapper">
                  <Button
                    action="Previous"
                    color="navy"
                    onClick={onPrev}
                    icon="arrowLeft"
                  />
                  <Button
                    action="Next"
                    color="pink"
                    onClick={onNext}
                    icon="arrowRight"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="form-wrapper">
            <div className="trim" />
            <div className="form-container">
              <div className="form-header">
                <h1>Sign up</h1>
                <span>3/4</span>
              </div>

              <StepTwo
                formState={formState}
                onValueChange={onValueChange}
                onKeyUp={handleEnterKey}
              />
              <div className="auth-error-wrapper">
                <ul>
                  {formState.errors.map(errorMessage => (
                    <li key={uuidv4()} className="auth-error-message">
                      {errorMessage}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="form-button-wrapper">
                <Button
                  action="Previous"
                  color="navy"
                  onClick={onPrev}
                  icon="arrowLeft"
                />
                <Button
                  action="Next"
                  color="pink"
                  onClick={onNextStepTwo}
                  icon="arrowRight"
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="form-wrapper">
            <div className="trim" />
            <div className="form-container">
              <div className="form-header">
                <h1>Sign up</h1>
                <span>4/4</span>
              </div>
              <StepThree
                formState={formState}
                onValueChange={onValueChange}
                handleAddClick={handleAddClick}
                handleRemoveClick={handleRemoveClick}
                onArrValueChange={onArrValueChange}
              />
              <div className="auth-error-wrapper">
                <ul>
                  {formState.errors.map(errorMessage => (
                    <li key={uuidv4()} className="auth-error-message">
                      {errorMessage}
                    </li>
                  ))}
                </ul>
              </div>
              <Button action="Previous" color="pink" onClick={onPrev} />
              <Button action="Submit" color="dark" onClick={handleSubmit} />
            </div>
          </div>
        );
    }
    console.log(formState);
  };

  return displayFormStep();
};

export default Signup;
