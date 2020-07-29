import React, { useContext } from 'react';
import { AuthContext } from '../../globalState/index';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const LoadingWrapper = ({ children }) => {
  const { isLoading } = useContext(AuthContext);

  return <div>{isLoading ? <LoadingSpinner /> : children}</div>;
};

export default LoadingWrapper;
