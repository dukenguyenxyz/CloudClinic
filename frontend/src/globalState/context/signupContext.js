import React, { useState } from 'react';

export const SignupContext = React.createContext();
export const SignupContextProvider = ({ children }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isDoctor, setIsDoctor] = useState(false);

  const signupState = {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    password,
    setPassword,
    passwordConfirmation,
    setPasswordConfirmation,
    isDoctor,
    setIsDoctor,
  };
  return (
    <SignupContext.Provider value={signupState}>
      {children}
    </SignupContext.Provider>
  );
};
