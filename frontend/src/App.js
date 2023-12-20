import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './components/Home'
import Layout from './components/Layout'
//import Navbar from './components/Header'
import FabcoinWallet from './components/FabcoinWallet';
//import FabcoinTransaction from './components/FabcoinTransaction';
import FabcoinTransaction from './components/spend'
import Registration from "./components/Registration"
import Dashboard from './components/Dashboard'
import MintToken from './components/MintToken';
import TransactionList from './components/TransactionList';
function App() {
  return (
    <> 
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Home />}/>
          <Route exact path="/Dashboard" element={<Dashboard />}/>
          <Route exact path="/FabcoinWallet" element={<FabcoinWallet/>} />
          <Route exact path="/FabcoinTransaction" element={<FabcoinTransaction/>} />
          <Route exact path="/Registration" element={<Registration />}/>
          <Route exact path="/MintToken" element={<MintToken />}/>
          <Route exact path="/TransactionList" element={<TransactionList />}/>
          </Route>
        </Routes>
      </Router>
    </div>
    </>
  );
}


export default App;
//<Registration/>
//<FabcoinWallet />
//<FabcoinTransaction />