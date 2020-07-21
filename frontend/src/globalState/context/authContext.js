import React, { useState } from 'react';

export const AuthContext = React.createContext();
export const AuthContextProvider = ({ children }) => {
  // const [JWT, setJWT] = useState('');
  // const [isDoctor, setIsDoctor] = useState(false);
  // const [user, setUser] = useState({
  //   firstName: 'DHH',
  // });
  const [user, setUser] = useState(null);

  const authState = {
    // JWT,
    // setJWT,
    // isDoctor,
    // setIsDoctor,
    user,
    setUser,
  };
  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};
