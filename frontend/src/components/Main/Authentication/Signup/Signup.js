import React, { useState, useEffect, useContext } from 'react';
import { navigate } from '@reach/router';
import { AuthContext } from '../../../../globalState/index';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import '../Form/Form.scss';
import Button from '../../../Button/Button';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { mockForm } from './mockdata';
import { FormWrapper, FormHeader, ErrorWrapper } from './hocs';

const Signup = () => {
  const { setUser } = useContext(AuthContext);
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
    state: '',
    country: 'Australia',
    postcode: '',
    existingConditions: [{ condition: '', startDate: '', notes: '' }],
    allergies: [{ name: '', severity: '' }],
    medication: [{ name: '', dosage: '', manufacturer: '' }],
    bloodType: '',
    //Doctor states
    licence: '',
    accreditations: [{ accreditation: '' }],
    specialtyField: '',
    subSpecialtyField: '',
    educations: [{ education: '' }],
    yearsExp: '',
    languages: [''],
  });

  // Testing sign up with pre-filled mock form
  let mockForm;
  useEffect(() => mockForm, []);

  const maxLengthCheck = el => {
    if (el.target.value.length > el.target.maxLength) {
      el.target.value = el.target.value.slice(0, el.target.maxLength);
    }
  };

  const handleYes = () => {
    setFormState({
      ...formState,
      isDoctor: true,
      step: formState.step + 1,
    });
  };

  const handleNo = () => {
    setFormState({
      ...formState,
      isDoctor: false,
      step: formState.step + 1,
    });
  };

  const onNextStepOne = () => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (
      // Incorrect fills cases
      !formState.password ||
      !formState.confirmPassword ||
      !formState.username ||
      !formState.email
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
    } else if (!emailRegex.test(formState.email)) {
      setFormState({
        ...formState,
        errors: ['Please enter a valid email'],
      });
    } else if (
      // Correct case
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
      // Incorrect fills cases
      !formState.firstName ||
      !formState.lastName ||
      !formState.title ||
      !formState.weight ||
      !formState.dob ||
      !formState.phone ||
      !formState.addressNumber ||
      !formState.street ||
      !formState.city ||
      !formState.country ||
      !formState.postcode
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
      // Correct case
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
      errors: [''],
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

  const onArrValueChange = (e, key, i, subKey) => {
    const list = [...formState[key]];
    list[i][subKey] = e.target.value;

    setFormState({
      ...formState,
      [key]: list,
    });
  };

  const handleLanguages = (e, i) => {
    const list = [...formState['languages']];
    list[i] = e.target.value;

    setFormState({
      ...formState,
      ['languages']: list,
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

  const sanitizedCommonForm = {
    firstName: formState.firstName,
    lastName: formState.lastName,
    title: formState.title,
    sex: formState.sex,
    weight: formState.weight,
    dateOfBirth: formState.dob,
    phoneNumber: formState.phone,
    email: formState.email,
    password: formState.password,
    confirmPassword: formState.confirmPassword,
    isDoctor: formState.isDoctor,
    address: {
      number: formState.addressNumber,
      street: formState.street,
      city: formState.city,
      state: formState.state,
      country: formState.country,
      postcode: formState.postcode,
    },
  };

  const sanitizedDoctorForm = () => {
    const doctorForm = { ...sanitizedCommonForm };
    doctorForm.doctorInfo = {
      licence: formState.licence,
      accreditations: deleteKeys('accreditations', 'accreditation'),
      specialtyField: formState.specialtyField,
      subSpecialtyField: formState.subSpecialtyField,
      education: deleteKeys('educations', 'education'),
      yearsExperience: formState.yearsExp,
      languagesSpoken: formState.languages,
    };

    return doctorForm;
  };

  const sanitizedClientForm = () => {
    const clientForm = { ...sanitizedCommonForm };
    clientForm.clientInfo = {
      medicalHistory: formState.existingConditions,
      allergies: formState.allergies,
      medication: formState.medication,
      bloodType: formState.bloodType,
    };

    return clientForm;
  };

  // init new array
  // loop over each object in the array
  // grab the value and push into the new array
  // return the new array
  const deleteKeys = (key, subKey) => {
    const newArr = [];
    formState[key].forEach(el => {
      newArr.push(el[subKey]);
    });
    return newArr;
  };

  const submitErrorCheck = (field, errorMessage, isDoctor = true) => {
    let isDoctorFormState = !!isDoctor
      ? formState.isDoctor
      : !formState.isDoctor;

    if (!formState[field] && isDoctorFormState) {
      setFormState({
        ...formState,
        errors: [`Please include ${errorMessage}`],
      });
    }
  };

  const handleSubmitArray = [
    ['licence', 'a valid licence number'],
    ['accreditation', 'a valid accreditation'],
    ['specialtyField', 'a specialty field'],
    ['education', 'your education'],
    ['specialtyField', 'a specialty field'],
    ['yearsExp', 'your years of experience'],
    ['languages', 'the languages you speak'],
    ['bloodType', 'your blood type', false],
  ];

  //handler for submitting form
  const handleSubmit = async () => {
    handleSubmitArray.forEach(item => {
      if (!item[3]) {
        submitErrorCheck(item[0], item[1]);
      } else {
        submitErrorCheck(item[0], item[1], item[3]);
      }
    });

    if (!formState.bloodType && !formState.isDoctor) {
      setFormState({
        ...formState,
        errors: ['Please include your blood type'],
      });
    }

    const developmentUrl = 'http://localhost:5000';
    // const productionUrl = 'http://cloudclinic.tech';
    const endpoint = `${developmentUrl}/api/users/signup`;

    // axios.defaults.headers.post['Content-Type'] = 'application/json';

    // Make axios post request to backend

    const sanitizedForm = formState.isDoctor
      ? sanitizedDoctorForm()
      : sanitizedClientForm();

    axios
      .post(endpoint, sanitizedForm /*mockForm*/, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
      .then(response => {
        console.log(response.data.user);

        const jwt = response.data.token;
        const user = response.data.user;
        localStorage.setItem('jwt', jwt);

        setUser(user);

        navigate('/profile');
      })
      .catch(error => {
        console.log(error.response);
        setFormState({
          ...formState,
          errors: [`${error.response.data}`],
        });
      });
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
    // console.log(formState);
    switch (formState.step) {
      case 0:
        return (
          <FormWrapper>
            <FormHeader title="Sign up" step="1/4" />
            <h3>Are you a Doctor?</h3>
            <ErrorWrapper formState={formState} />
            <div className="form-button-wrapper">
              <Button
                action="No"
                color="pink"
                onClick={handleNo}
                icon="cross"
              />
              <Button
                action="Yes"
                color="pink"
                onClick={handleYes}
                icon="check"
              />
            </div>
          </FormWrapper>
        );
      case 1:
        return (
          <FormWrapper>
            <FormHeader title="Sign up" step="2/4" />
            <StepOne
              formState={formState}
              onValueChange={onValueChange}
              onKeyUp={handleEnterKey}
            />
            <ErrorWrapper formState={formState} />
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
                onClick={onNextStepOne}
                icon="arrowRight"
              />
            </div>
          </FormWrapper>
        );
      case 2:
        return (
          <FormWrapper>
            <FormHeader title="Sign up" step="3/4" />
            <StepTwo
              formState={formState}
              onValueChange={onValueChange}
              onKeyUp={handleEnterKey}
              onInput={maxLengthCheck}
            />
            <ErrorWrapper formState={formState} />
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
          </FormWrapper>
        );
      case 3:
        return (
          <FormWrapper>
            <FormHeader title="Sign up" step="4/4" />
            <StepThree
              formState={formState}
              onValueChange={onValueChange}
              handleAddClick={handleAddClick}
              handleRemoveClick={handleRemoveClick}
              onArrValueChange={onArrValueChange}
              handleLanguages={handleLanguages}
              onInput={maxLengthCheck}
            />
            <ErrorWrapper formState={formState} />
            <div className="form-button-wrapper">
              <Button
                action="Previous"
                color="navy"
                onClick={onPrev}
                icon="arrowLeft"
              />
              <Button
                action="Submit"
                color="pink"
                onClick={handleSubmit}
                icon="check"
              />
            </div>
          </FormWrapper>
        );
      default:
        return '';
    }
  };

  return displayFormStep();
};

export default Signup;
