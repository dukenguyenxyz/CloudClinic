import React from 'react';
import './App.scss';
import { Router, Location } from '@reach/router';
import { AnimatePresence } from 'framer-motion';
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
import PrivateDoctorRoute from './components/PrivateDoctorRoute/PrivateDoctorRoute';
import AccountSettings from './components/Main/AccountSettings/AccountSettings';
import PatientList from './components/Main/Patients/PatientList/PatientList';
import ViewNavigation from './components/ViewNavigation/ViewNavigation';
import MotionContainer from './components/MotionContainer/MotionContainer';
import PatientProfile from './components/Main/Patients/PatientProfile/PatientProfile';
import ViewDoctor from './components/Home/ViewDoctor/ViewDoctor';
import LoadingWrapper from './components/LoadingWrapper/LoadingWrapper';
import FlashMessage from './components/FlashMessage/FlashMessage';

function App() {
  const routeVariants = {
    initial: {
      opacity: 0,
      x: '-10vw',
      scale: 0.96,
    },
    in: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    out: {
      opacity: 0,
      x: '10vw',
      scale: 0.96,
    },
  };

  const headerVariants = {
    initial: {
      opacity: 1,
    },
    in: {
      opacity: 1,
    },
    out: {
      opacity: 1,
    },
  };

  const routeTransition = {
    duration: 0.9,
    type: 'tween',
    ease: 'easeInOut',
  };

  return (
    <ContextProvider>
      <div className="App">
        <Location>
          {({ location }) => (
            <Layout>
              <Navbar location={location} />
              <LoadingWrapper>
                <Main>
                  <FlashMessage />
                  <AnimatePresence exitBeforeEnter>
                    <Header
                      location={location}
                      key={location.key}
                      variants={headerVariants}
                      initialAnimation={'initial'}
                      inAnimation={'in'}
                      outAnimation={'out'}
                      transition={routeTransition}
                    />
                  </AnimatePresence>
                  <AnimatePresence exitBeforeEnter initial={false}>
                    <MotionContainer
                      location={location}
                      variants={routeVariants}
                      initialAnimation={'initial'}
                      inAnimation={'in'}
                      outAnimation={'out'}
                      transition={routeTransition}
                      key={location.key}
                    >
                      <ViewNavigation location={location} />
                      <Router location={location}>
                        <Home path="/" />
                        <ViewDoctor path="/doctors/:id" />
                        <PrivateRoute as={Profile} path="/profile" />
                        <PrivateDoctorRoute as={Patients} path="/patients">
                          <PatientList path="/" />
                          <PatientProfile path=":id" />
                        </PrivateDoctorRoute>
                        <PrivateRoute as={Messaging} path="/messaging" />
                        <PrivateRoute as={Appointments} path="/appointments" />
                        <PrivateRoute as={AccountSettings} path="/settings" />
                        <Authentication
                          path="/authentication"
                          location={location}
                        />
                        <FourOhFour path="/404" default />
                      </Router>
                    </MotionContainer>
                  </AnimatePresence>
                </Main>
              </LoadingWrapper>
            </Layout>
          )}
        </Location>
      </div>
    </ContextProvider>
  );
}

export default App;
