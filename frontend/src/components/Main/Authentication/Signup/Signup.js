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

  const onNext = () => {
    if (
      formState.password === formState.confirmPassword &&
      formState.password !== ''
    ) {
      setFormState({
        ...formState,
        step: formState.step + 1,
      });
    } else {
    }
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

  const onArrValueChange = (e, key, i, subKey) => {
    const list = [...formState[key]];
    list[i][subKey] = e.target.value;

    // console.log(list);
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

  const handleEnterKey = e => {
    if (e.keyCode === 13) {
      onNext();
    }
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

  const displayFormStep = () => {
    console.log(formState);

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
              <StepOne
                formState={formState}
                onValueChange={onValueChange}
                onKeyUp={handleEnterKey}
              />
              <div className="form-button-wrapper">
                <Button
                  action="Next"
                  color="pink"
                  onClick={onNext}
                  icon="arrowRight"
                />
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
                <span>2/3</span>
              </div>

              <StepTwo formState={formState} onValueChange={onValueChange} />
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
                handleRemoveClick={handleRemoveClick}
                onArrValueChange={onArrValueChange}
              />
              <Button action="Previous" color="pink" onClick={onPrev} />
              <Button action="Submit" color="dark" onClick={handleSubmit} />
            </div>
          </div>
        );
    }
  };

  return displayFormStep();
};

export default Signup;
