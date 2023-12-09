import React from 'react';
import './App.css';
import FabcoinWallet from './components/FabcoinWallet';
import FabcoinTransaction from './components/FabcoinTransaction';
import Registration from "./components/Registration"
function App() {
  return (
    <div className="App">
      <h1 >Fabric Client App</h1>
      <Registration/>
      <FabcoinWallet />
      <FabcoinTransaction />
    </div>
  );
}


export default App;
