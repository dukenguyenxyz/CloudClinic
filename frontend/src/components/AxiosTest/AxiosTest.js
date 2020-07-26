import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Button from '../Button/Button';
import { v4 as uuidv4 } from 'uuid';
import faker from 'faker';
import { AuthContext } from '../../globalState/index';
import './AxiosTest.scss';
import {
  signUpClient,
  signUpDoctor,
  signInClient,
  signInDoctor,
  signOut,
  signOutAll,
  viewProfile,
  updateProfile,
  deleteProfile,
  viewClient,
  viewClients,
  viewDoctors,
  viewDoctor,
} from './userRoutes';

import {
  viewSessions,
  createSessions,
  deleteSession,
  bookSession,
  updateSession,
  cancelSession,
} from './sessionRoutes';

const AxiosTest = () => {
  const { user, setUser } = useContext(AuthContext);
  const [response, setResponse] = useState({});

  useEffect(() => {}, []);

  return (
    <div>
      <div>
        <div className="response">
          <h1>Route Tests</h1>
        </div>
        <div className="actions">
          <div className="route-wrapper">
            <Button
              action="sign up client"
              onClick={signUpClient}
              color="pink"
              icon="check"
            />
          </div>

          <Button
            action="sign up doctor"
            onClick={signUpDoctor}
            color="pink"
            icon="check"
          />
          <Button
            action="sign in user"
            onClick={signInClient}
            color="pink"
            icon="check"
          />
          <Button
            action="sign in doctor"
            onClick={signInDoctor}
            color="pink"
            icon="check"
          />
          <Button
            action="sign out user"
            onClick={signOut}
            color="pink"
            icon="check"
          />
          <Button
            action="sign out all users"
            onClick={signOutAll}
            color="pink"
            icon="check"
          />
          <Button
            action="view profile"
            onClick={viewProfile}
            color="pink"
            icon="check"
          />
          <Button
            action="update profile"
            onClick={updateProfile}
            color="pink"
            icon="check"
          />
          <Button
            action="delete profile"
            onClick={deleteProfile}
            color="pink"
            icon="check"
          />
          <Button
            action="view clients"
            onClick={viewClients}
            color="pink"
            icon="check"
          />
          <Button
            action="view client"
            onClick={viewClient}
            color="pink"
            icon="check"
          />
          <Button
            action="view doctors"
            onClick={viewDoctors}
            color="pink"
            icon="check"
          />
          <Button
            action="view doctors"
            onClick={viewDoctors}
            color="pink"
            icon="check"
          />
          <Button
            action="view doctor"
            onClick={viewDoctor}
            color="pink"
            icon="check"
          />
          <Button
            action="view sessions"
            onClick={viewSessions}
            color="pink"
            icon="check"
          />
          <Button
            action="create sessions"
            onClick={createSessions}
            color="pink"
            icon="check"
          />
          <Button
            action="create sessions"
            onClick={deleteSession}
            color="pink"
            icon="check"
          />
          <Button
            action="create sessions"
            onClick={bookSession}
            color="pink"
            icon="check"
          />
          <Button
            action="create sessions"
            onClick={updateSession}
            color="pink"
            icon="check"
          />
          <Button
            action="create sessions"
            onClick={cancelSession}
            color="pink"
            icon="check"
          />
        </div>
      </div>
    </div>
  );
};

export default AxiosTest;
