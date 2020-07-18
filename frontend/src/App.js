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

function App() {
  return (
    <ContextProvider>
      <div className="App">
        <Location>
          {({ location }) => (
            <Layout>
              <Navbar />
              <Main>
                <Header location={location} />
                <Router>
                  <Home path="/" />
                  <PrivateRoute as={Profile} path="/profile" />
                  <PrivateRoute as={Patients} path="/patients" />
                  <PrivateRoute as={Messaging} path="/messaging" />
                  <PrivateRoute as={Appointments} path="/appointments" />
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
