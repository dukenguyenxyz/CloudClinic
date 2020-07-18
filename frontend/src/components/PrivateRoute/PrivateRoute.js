import React, { useContext } from 'react';
import { Redirect } from '@reach/router';
import { AuthContext } from '../../globalState/index';

const PrivateRoute = props => {
  const { user } = useContext(AuthContext);
  var { as: Comp, ...props } = props;
  return user ? (
    <Comp {...props} />
  ) : (
    <Redirect to="/authentication" replace={true} noThrow={true} />
  );
};

export default PrivateRoute;
