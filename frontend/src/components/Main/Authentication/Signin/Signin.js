import React, { useState, useContext } from 'react';
import omitDeep from 'omit-deep-lodash';
import '../Form/Form.scss';
import AuthInput from '../Form/AuthInput/AuthInput';
import Button from '../../../Button/Button';
import { signInUser } from '../../../AxiosTest/userRoutes';
import { AuthContext, MessageContext } from '../../../../globalState/index';
import { navigate } from '@reach/router';

const Signin = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const { setUser } = useContext(AuthContext);
  const { setFlashMessage } = useContext(MessageContext);

  const onValueChange = (e, key) => {
    setFlashMessage(null);
    setFormState({
      ...formState,
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
      setFlashMessage({
        message: 'Please fill in all inputs',
        type: 'error',
        icon: 'alert',
      });

      return null;
    } else if (!emailRegex.test(formState.email)) {
      setFlashMessage({
        message: 'Please enter a valid email',
        type: 'error',
        icon: 'alert',
      });
      return null;
    } else {
      try {
        const res = await signInUser({
          email: formState.email,
          password: formState.password,
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
        setFlashMessage({
          message: `${error.message}`,
          type: 'error',
          icon: 'alert',
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
            dataCypress="email"
          />
          <AuthInput
            value={formState.password}
            placeholder="Password"
            type="password"
            icon="password"
            minLength="6"
            onValueChange={e => onValueChange(e, 'password')}
            onKeyUp={handleEnterKey}
            dataCypress="password"
          />
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
