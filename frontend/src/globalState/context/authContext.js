import React, { useState } from 'react';

export const AuthContext = React.createContext();
export const AuthContextProvider = ({ children }) => {
  // const [JWT, setJWT] = useState('');
  // const [isDoctor, setIsDoctor] = useState(false);
<<<<<<< HEAD
  // const [user, setUser] = useState({
  //   firstName: 'DHH',
  // });
  const [user, setUser] = useState(null);
=======
  const [user, setUser] = useState({
    firstName: 'DHH',
  });
  // const [user, setUser] = useState(null);
>>>>>>> 3303baf9a1004128410c3497553a0ac632f2894e

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
