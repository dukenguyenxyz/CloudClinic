import React, { useContext } from 'react';
import { Redirect } from '@reach/router';
import { AuthContext } from '../../globalState/index';

const PrivateDoctorRoute = rest => {
  const { user } = useContext(AuthContext);
  const { as: Comp, ...props } = rest;
  return user.isDoctor ? (
    <Comp {...props} />
  ) : (
    <Redirect to="/404" replace={true} noThrow={true} />
  );
};

export default PrivateDoctorRoute;
