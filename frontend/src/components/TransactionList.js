import React, { useState, useEffect } from 'react';
//import axios from 'axios';

const TransactionList = () => {
  const [TXID, setTXID] = useState([]);
  useEffect(() => {
    // Fetch transactions from the backend API
    const fetchTXID = async () => {
      try {
        const response = await fetch('http://localhost:3000/token/get-all-tokens/');
        const data = await response.json();
        setTXID(data); // Update the state with fetched transactions
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTXID();
  }, []);


  return (
    <div>
      <h2>Transaction List</h2>
      {TXID.length === 0 ? (
        <p>No UTXO transactions available.</p>
      ) : (
        <ul>
          {TXID.map((transaction) => (
            <li key={transaction.id}>{transaction.description}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;

