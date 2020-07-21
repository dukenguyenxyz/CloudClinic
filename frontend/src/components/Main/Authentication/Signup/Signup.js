import React, { useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import '../Form/Form.scss';
import Button from '../../../Button/Button';

const Signup = () => {
  const [formState, setFormState] = useState({
    step: 1,
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    title: '',
    sex: '',
    weight: '',
    dob: '',
    phone: '',
    addressNumber: '',
    street: '',
    city: '',
    country: '',
    postcode: '',
    // condition: '',
    // conditionStartDate: '',
    // conditionComment: '',
    existingConditions: [
      { condition: '', conditionStartDate: '', conditionComment: '' },
      { condition: '', conditionStartDate: '', conditionComment: '' },
    ],
    // allergy: '',
    // severity: '',
    allergies: [{ allergy: '', severity: '' }],
    // medication: '',
    // dosage: '',
    // manufacturer: '',
    medications: [{ medication: '', dosage: '', manufacturer: '' }],
    bloodType: '',
    //Doctor states
    licence: '',
    accreditation: '',
    specialtyField: '',
    subSpecialtyField: '',
    education: '',
    yearsExp: '',
    // language: '',
    languages: [{ language: '' }],
  });

  const onNext = () => {
    setFormState({
      ...formState,
      step: formState.step + 1,
    });
  };

  const onPrev = () => {
    setFormState({
      ...formState,
      step: formState.step - 1,
    });
  };

  const onValueChange = (e, key) => {
    setFormState({
      ...formState,
      [key]: e.target.value,
    });
  };

  //Handlers for adding/removing extra form fields
  // const handleRemoveClick = (index) => {

  // }

  //key param refers to which key to reference e.g. existingConditions
  //stateFields is the object that is needed to be put into the array
  //e.g. stateFields = { condition: '', conditionStartDate: '', conditionComment: '' }
  const handleAddClick = (key, formFieldsObject) => {
    setFormState({
      ...formState,
      [key]: [...formFieldsObject],
      // [key]: formState.key.push(formFieldsObject),
    });
  };

  // const handleAddClick = (arr, formFieldsObject, key) => {
  //   setFormState({
  //     ...formState,
  //     [key]: arr.push(formFieldsObject),
  //   });
  // };

  const displayFormStep = () => {
    switch (formState.step) {
      case 1:
        return (
          <div className="form-wrapper">
            <div className="trim" />
            <div className="form-container">
              <div className="form-header">
                <h1>Sign up</h1>
                <span>1/3</span>
              </div>
              <StepOne formState={formState} onValueChange={onValueChange} />
              <Button action="Next" color="pink" onClick={onNext} />
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
                <span>2/3</span>
              </div>

              <StepTwo formState={formState} onValueChange={onValueChange} />
              <Button action="Next" color="pink" onClick={onNext} />
              <Button action="Previous" color="pink" onClick={onPrev} />
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
                <span>3/3</span>
              </div>

              <StepThree
                formState={formState}
                onValueChange={onValueChange}
                handleAddClick={handleAddClick}
              />
              <Button action="Previous" color="pink" onClick={onPrev} />
            </div>
          </div>
        );
    }
  };

  return displayFormStep();
};

export default Signup;
