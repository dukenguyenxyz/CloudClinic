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

function App() {
  const routeVariants = {
    initial: {
      opacity: 0,
      x: '-100vw',
    },
    in: {
      opacity: 1,
      x: 0,
    },
    out: {
      opacity: 0,
      x: '100vw',
    },
  };

  const routeTransition = {
    duration: 2,
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
                <Header location={location} />
                <ViewNavigation location={location} />
                <AnimatePresence exitBeforeEnter key={location.key}>
                  <Router location={location}>
                    <Home
                      path="/"
                      variants={routeVariants}
                      initialAnimation={'initial'}
                      inAnimation={'in'}
                      outAnimation={'out'}
                      transition={routeTransition}
                    />
                    <PrivateRoute
                      as={Profile}
                      path="/profile"
                      variants={routeVariants}
                      initialAnimation={'initial'}
                      inAnimation={'in'}
                      outAnimation={'out'}
                      transition={routeTransition}
                    />
                    <PrivateRoute
                      as={Patients}
                      path="/patients"
                      variants={routeVariants}
                      initialAnimation={'initial'}
                      inAnimation={'in'}
                      outAnimation={'out'}
                      transition={routeTransition}
                    >
                      <PatientList path="/" />
                      <UserProfile path=":id" />
                    </PrivateRoute>
                    <PrivateRoute
                      as={Messaging}
                      path="/messaging"
                      variants={routeVariants}
                      initialAnimation={'initial'}
                      inAnimation={'in'}
                      outAnimation={'out'}
                      transition={routeTransition}
                    />
                    <PrivateRoute
                      as={Appointments}
                      path="/appointments"
                      variants={routeVariants}
                      initialAnimation={'initial'}
                      inAnimation={'in'}
                      outAnimation={'out'}
                      transition={routeTransition}
                    />
                    <PrivateRoute
                      as={AccountSettings}
                      path="/settings"
                      variants={routeVariants}
                      initialAnimation={'initial'}
                      inAnimation={'in'}
                      outAnimation={'out'}
                      transition={routeTransition}
                    />
                    <Authentication
                      path="/authentication"
                      variants={routeVariants}
                      initialAnimation={'initial'}
                      inAnimation={'in'}
                      outAnimation={'out'}
                      transition={routeTransition}
                    />
                    <FourOhFour
                      default
                      variants={routeVariants}
                      initialAnimation={'initial'}
                      inAnimation={'in'}
                      outAnimation={'out'}
                      transition={routeTransition}
                    />
                  </Router>
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
