import React from 'react';
import './App.scss';
import { Router } from '@reach/router';
import ContextProvider from './globalState/state';
import Navbar from './components/Navbar/Navbar';
import Layout from './components/Layout/Layout';
import Main from './components/Main/Main';
import Profile from './components/Main/Profile/Profile';
import Messaging from './components/Main/Messaging/Messaging';
import Appointments from './components/Main/Appointments/Appointments';

function App() {
  return (
    <ContextProvider>
      <div className="App">
        <Layout>
          <Navbar />
          <Main>
            <Router>
              <Profile path="profile" />
              <Messaging path="messaging" />
              <Appointments path="appointments" />
            </Router>
          </Main>
        </Layout>
      </div>
    </ContextProvider>
  );
}

export default App;
