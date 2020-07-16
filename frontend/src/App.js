import React from 'react';
import './App.scss';
import Card from './components/Card/Card';
import ContextProvider from './globalState/state';
import Navbar from './components/Navbar/Navbar';
import Grid from './components/Grid/Grid';

function App() {
  return (
    <ContextProvider>
      <div className="App">
        <Navbar />
        <Card />
        <Grid>
          <Card />
        </Grid>
      </div>
    </ContextProvider>
  );
}

export default App;
