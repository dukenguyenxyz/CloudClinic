import React, { useContext, useEffect } from 'react';
import AuthInput from '../../Authentication/Form/AuthInput/AuthInput';
import AuthSelect from '../../Authentication/Form/AuthSelect/AuthSelect';

import { AuthContext } from '../../../../globalState/index';
import axios from 'axios';

const UpdateProfile = () => {
  const { user, setUser } = useContext(AuthContext);

  return (
    <div className="update-profile-wrapper">
      <h1>form here</h1>
    </div>
  );
};

export default UpdateProfile;
