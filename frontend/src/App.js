import React from 'react';
import './App.scss';
import ContextProvider from './globalState/state';
import Navbar from './components/Navbar/Navbar';
import Layout from './components/Layout/Layout';
import Main from './components/Main/Main';

function App() {
  return (
    <ContextProvider>
      <div className="App">
        <Layout>
          <Navbar />
          <Main />
        </Layout>
      </div>
    </ContextProvider>
  );
}

export default App;
