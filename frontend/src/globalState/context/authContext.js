import React, { useState } from 'react';

export const AuthContext = React.createContext();
export const AuthContextProvider = ({ children }) => {
  const [JWT, setJWT] = useState('');
  const [isDoctor, setIsDoctor] = useState(false);

  const authState = {
    JWT,
    setJWT,
    isDoctor,
    setIsDoctor,
  };
  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};
