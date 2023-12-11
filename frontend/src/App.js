import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './components/Home'
import Layout from './components/Layout'
//import Navbar from './components/Header'
import FabcoinWallet from './components/FabcoinWallet';
import FabcoinTransaction from './components/FabcoinTransaction';
import Registration from "./components/Registration"
import Dashboard from './components/Dashboard'
//import TransactionList from './components/TransactionList';
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
          <Route exact path="/Fabcointransaction" element={<FabcoinTransaction/>} />
          <Route exact path="/Registration" element={<Registration />}/>
          
          </Route>
        </Routes>
      </Router>
    </div>
    </>
  );
}


export default App;
//<Route exact path="/TransactionList" element={<TransactionList />}/>
//<Registration/>
//<FabcoinWallet />
//<FabcoinTransaction />