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
import AccountSettings from './components/AccountSettings/AccountSettings';
import UserProfile from './components/Main/Profile/UserProfile/UserProfile';
import PatientList from './components/Main/Patients/PatientList/PatientList';
import ViewNavigation from './components/ViewNavigation/ViewNavigation';
import MotionContainer from './components/MotionContainer/MotionContainer';

function App() {
  const routeVariants = {
    initial: {
      opacity: 0,
      x: '-100vw',
      scale: 0.9,
    },
    in: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    out: {
      opacity: 0,
      x: '100vw',
      scale: 0.9,
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
              <Main>
                <AnimatePresence exitBeforeEnter>
                  <MotionContainer
                    location={location}
                    variants={routeVariants}
                    initialAnimation={'initial'}
                    inAnimation={'in'}
                    outAnimation={'out'}
                    transition={routeTransition}
                    key={location.key}
                  >
                    <Header location={location} />
                    <ViewNavigation location={location} />
                    <Router location={location}>
                      <Home path="/" />
                      <PrivateRoute as={Profile} path="/profile" />
                      <PrivateRoute as={Patients} path="/patients">
                        <PatientList path="/" />
                        <UserProfile path=":id" />
                      </PrivateRoute>
                      <PrivateRoute as={Messaging} path="/messaging" />
                      <PrivateRoute as={Appointments} path="/appointments" />
                      <PrivateRoute as={AccountSettings} path="/settings" />
                      <Authentication
                        path="/authentication"
                        location={location}
                      />
                      <FourOhFour default />
                    </Router>
                  </MotionContainer>
                </AnimatePresence>
              </Main>
            </Layout>
          )}
        </Location>
      </div>
    </ContextProvider>
  );
}

export default App;
