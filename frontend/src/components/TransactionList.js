import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch transactions from your Node.js backend
    axios.get('http://localhost:3001/transactions')
      .then(response => setTransactions(response.data))
      .catch(error => console.error('Error fetching transactions:', error));
  }, []);

  return (
    <div>
      <h2>Transaction List</h2>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>{transaction.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;

//import React, { useEffect, useState } from 'react';

//const TransactionList = () => {
//  const [transactions, setTransactions] = useState([]);

//  useEffect(() => {
    // Implement logic to fetch transactions from your smart contract
//    console.log('Fetching transactions');
//  }, []);

//  return (
//    <div>
//      <h2>Transaction List</h2>
//      {/* Display the list of transactions */}
//    </div>
//  );
//};

//export default TransactionList;