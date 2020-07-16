import React from 'react';
import './App.scss';
import Card from './components/Card/Card';
import SearchContextProvider from './context/searchContext';

function App() {
  return (
    <SearchContextProvider>
      <div className="App">
        <h1 className="bold">Maison Neue 700</h1>
        <h1 className="medium">Maison Neue 600</h1>
        <h1 className="demi">Maison Neue 500</h1>
        <h1 className="book">Maison Neue 400</h1>
        <h1 className="light">Maison Neue 300</h1>
        <br />
        <br />
        <Card />
      </div>
    </SearchContextProvider>
  );
}

export default App;
