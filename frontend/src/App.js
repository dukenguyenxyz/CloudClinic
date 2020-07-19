import React from 'react';
import './App.scss';
import { Router, Location } from '@reach/router';
import ContextProvider from './globalState/state';
import Navbar from './components/Navbar/Navbar';
import Layout from './components/Layout/Layout';
import Main from './components/Main/Main';
import Profile from './components/Main/Profile/Profile';
import Messaging from './components/Main/Messaging/Messaging';
import Appointments from './components/Main/Appointments/Appointments';
import Authentication from './components/Main/Authentication/Authentication';
import Header from './components/Header/Header';
import FourOhFour from './components/FourOhFour/FourOhFour';
import Patients from './components/Main/Patients/Patients';
import Home from './components/Home/Home';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import AccountSettings from './components/AccountSettings/AccountSettings';
import UserProfile from './components/Main/Profile/UserProfile/UserProfile';
import PatientList from './components/Main/Patients/PatientList/PatientList';
import ViewNavigation from './components/ViewNavigation/ViewNavigation';

function App() {
  return (
    <ContextProvider>
      <div className="App">
        <Location>
          {({ location }) => (
            <Layout>
              <Navbar location={location} />
              <Main>
                <Header location={location} />
                <ViewNavigation location={location} />
                <Router>
                  <Home path="/" />
                  <PrivateRoute as={Profile} path="/profile" />
                  <PrivateRoute as={Patients} path="/patients">
                    <PatientList path="/" />
                    <UserProfile path=":id" />
                  </PrivateRoute>
                  <PrivateRoute as={Messaging} path="/messaging" />
                  <PrivateRoute as={Appointments} path="/appointments" />
                  <PrivateRoute as={AccountSettings} path="/settings" />
                  <Authentication path="/authentication" />
                  <FourOhFour default />
                </Router>
              </Main>
            </Layout>
          )}
        </Location>
      </div>
    </ContextProvider>
  );
}

export default App;
