import React, { useContext } from 'react';
import { Redirect } from '@reach/router';
import { AuthContext } from '../../globalState/index';

const PrivateRoute = rest => {
  const { user } = useContext(AuthContext);
  const { as: Comp, ...props } = rest;
  return user ? (
    <Comp {...props} />
  ) : (
    <Redirect to="/authentication" replace={true} noThrow={true} />
  );
};

export default PrivateRoute;
