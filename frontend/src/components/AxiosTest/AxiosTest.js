import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Button from '../Button/Button';
import { AuthContext } from '../../../globalState/index';

const AxiosTest = () => {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {}, []);

  return (
    <div>
      <div>
        <h1>hello</h1>
      </div>
    </div>
  );
};

export default AxiosTest;
