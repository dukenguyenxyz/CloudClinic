import React, { useState, useEffect, useContext } from 'react';
import _ from 'lodash';
import omitDeep from 'omit-deep-lodash';
import '../Form/Form.scss';
import AuthInput from '../Form/AuthInput/AuthInput';
import Button from '../../../Button/Button';
import { signInUser } from '../../../AxiosTest/userRoutes';
import { AuthContext } from '../../../../globalState/index';
import { navigate } from '@reach/router';

const Signin = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    errors: [],
  });

  const { user, setUser } = useContext(AuthContext);

  const onValueChange = (e, key) => {
    setFormState({
      ...formState,
      errors: [],
      [key]: e.target.value,
    });
  };

  const handleEnterKey = e => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!formState.email || !formState.password) {
      setFormState({
        ...formState,
        errors: ['Please fill in all fields'],
      });
      return null;
    } else if (!emailRegex.test(formState.email)) {
      setFormState({
        ...formState,
        errors: ['Please enter a valid email'],
      });
      return null;
    } else {
      try {
        const res = await signInUser({
          email: formState.email, // 'w34234asdf@gmail.com',
          password: formState.password, // '123456789'
        });
        localStorage.setItem('cloudclinicJWT', res.data.token);
        const sanitizedUser = omitDeep(res.data.user, [
          '_id',
          '__v',
          'createdAt',
        ]);
        setUser(sanitizedUser);
        navigate('/appointments');
        console.log(res);
      } catch (error) {
        console.log(error);
        setFormState({
          ...formState,
          errors: [`Something went wrong`],
        });
      }
    }
  };

  return (
    <div className="form-wrapper">
      <div className="trim" />
      <div className="form-container">
        <div className="form-header">
          <h1>Sign In</h1>
        </div>
        <div>
          <AuthInput
            value={formState.email}
            placeholder="Email"
            stateKey="email"
            type="email"
            icon="email"
            minLength="3"
            onValueChange={e => onValueChange(e, 'email')}
            onKeyUp={handleEnterKey}
          />
          <AuthInput
            value={formState.password}
            placeholder="Password"
            type="password"
            icon="password"
            minLength="6"
            onValueChange={e => onValueChange(e, 'password')}
            onKeyUp={handleEnterKey}
          />
        </div>
        <div className="auth-error-wrapper">
          <ul>
            {formState.errors.map((errorMessage, i) => (
              <li key={i} className="auth-error-message">
                {errorMessage}
              </li>
            ))}
          </ul>
        </div>
        <div className="form-button-wrapper">
          <Button
            action="Sign in"
            color="pink"
            onClick={() => handleSubmit()}
            icon="logIn"
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
