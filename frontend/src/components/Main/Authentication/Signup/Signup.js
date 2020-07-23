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
import faker from 'faker';

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
    accreditation: '',
    specialtyField: '',
    subSpecialtyField: '',
    education: '',
    yearsExp: '',
    languages: [''],
  });

  let mockForm2;

  // useEffect(() => {
  //   const email = () => faker.internet.email();
  //   const newEmail = email();

  //   mockForm2 = {
  //     firstName: 'Lisa',
  //     lastName: 'Huang',
  //     title: 'Mr',
  //     sex: 'female',
  //     weight: '55',
  //     dateOfBirth: '05/11/1999',
  //     phoneNumber: '04104820594',
  //     email: `${newEmail}`,
  //     password: '123456789',
  //     confirmPassword: '123456789',
  //     isDoctor: 'true',
  //     address: {
  //       number: '4',
  //       street: 'Beamish Street',
  //       city: 'Sydney',
  //       state: 'New South Wales',
  //       country: 'Australia',
  //       postcode: '2149',
  //     },
  //     doctorInfo: {
  //       licence: 'MIT',
  //       accreditations: ['USyd', 'UNSW'],
  //       specialtyField: 'Dentistry',
  //       subSpecialtyField: 'Prosthodontics',
  //       education: ['ANU', 'Macquarie University'],
  //       yearsExperience: '10',
  //       tags: ['Orthodontics', 'Prosthodontics'],
  //       languagesSpoken: ['Cantonese', 'Mandarin', 'Japanese', 'English'],
  //     },
  //     clientInfo: {
  //       medicalHistory: [
  //         {
  //           startDate: '03/05/2005',
  //           condition: 'High Blood Pressure',
  //           notes: 'Due to old age',
  //         },
  //         {
  //           startDate: '11/11/2003',
  //           condition: 'Pneumonia',
  //           notes: 'Due to travel to Africa',
  //         },
  //       ],
  //       allergies: [
  //         {
  //           name: 'Dust allergy',
  //           severity: '3',
  //         },
  //         {
  //           name: 'Pollen allergy',
  //           severity: '2',
  //         },
  //       ],
  //       medication: [
  //         {
  //           name: 'Magic mushroom',
  //           dosage: '200',
  //           manufacturer: 'Brazil',
  //         },
  //         {
  //           name: 'Cannabis',
  //           dosage: '100',
  //           manufacturer: 'Australia',
  //         },
  //       ],
  //       bloodType: 'A+',
  //     },
  //   };

  //   console.log(newEmail);
  //   console.log('mounted');
  // }, []);

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

  const sanitizedDoctorForm = () => {
    return {
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
      doctorInfo: {
        licence: formState.licence,
        accreditations: formState.accreditation,
        specialtyField: formState.specialtyField,
        subSpecialtyField: formState.subSpecialtyField,
        education: formState.education,
        yearsExperience: formState.yearsExp,
        languagesSpoken: formState.languages,
      },
    };
  };

  const sanitizedClientForm = () => {
    return {
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
      clientInfo: {
        medicalHistory: formState.existingConditions,
        allergies: formState.allergies,
        medication: formState.medication,
        bloodType: formState.bloodType,
      },
    };
  };

  //handler for submitting form
  const handleSubmit = async () => {
    if (!formState.licence && formState.isDoctor) {
      setFormState({
        ...formState,
        errors: ['Please include a valid licence number'],
      });
    }

    if (!formState.accreditation && formState.isDoctor) {
      setFormState({
        ...formState,
        errors: ['Please include a valid accreditation'],
      });
    }

    if (!formState.specialtyField && formState.isDoctor) {
      setFormState({
        ...formState,
        errors: ['Please include a specialty field'],
      });
    }

    if (!formState.education && formState.isDoctor) {
      setFormState({
        ...formState,
        errors: ['Please include your education'],
      });
    }

    if (!formState.yearsExp && formState.isDoctor) {
      setFormState({
        ...formState,
        errors: ['Please include your years of experience'],
      });
    }

    if (!formState.languages && formState.isDoctor) {
      setFormState({
        ...formState,
        errors: ['Please include the languages you speak'],
      });
    }

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
      .post(endpoint, sanitizedForm /*mockForm2*/, {
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
        // console.log(error.response);
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
              <h3>Are you a Doctor?</h3>
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
                handleLanguages={handleLanguages}
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
                  action="Submit"
                  color="pink"
                  onClick={handleSubmit}
                  icon="check"
                />
              </div>
            </div>
          </div>
        );
    }
    console.log(formState);
  };

  return displayFormStep();
};

export default Signup;
