import React, { useState } from 'react';

export const AuthContext = React.createContext();
export const AuthContextProvider = ({ children }) => {
  // const [isDoctor, setIsDoctor] = useState(false);
  const [user, setUser] = useState({
    firstName: 'DHH',
    isDoctor: false,
  });
  // const [user, setUser] = useState(null);

  const authState = {
    user,
    setUser,
  };
  return (
    <AuthContext.Provider value={authState}> {children} </AuthContext.Provider>
  );
};
