import React from 'react';
import { useState } from "react";
//import { initiateTransaction } from '../services/FabcoinService';

const FabcoinTransaction = () => {
  const [amount, setAmount] = useState("");
  const [receiver, setReceiver] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the name change
  const handleAmount = (e) => {
      setAmount(e.target.value);
      setSubmitted(false);
  };

  // Handling the email change
  const handleReceiver = (e) => {
      setReceiver(e.target.value);
      setSubmitted(false);
  };

// Showing success message
const successMessage = () => {
    return (
        <div
            className="success"
            style={{
                display: submitted ? "" : "none",
            }}
        >
            <h1>Transferred {amount} to {receiver} successfully!!</h1>
        </div>
    );
};

// Showing error message if error is true
const errorMessage = () => {
    return (
        <div
            className="error"
            style={{
                display: error ? "" : "none",
            }}
        >
            <h1>Please enter all the fields</h1>
        </div>
    );
};

  const handleTransaction = (e) => {
    // Implement transaction initiation logic
    e.preventDefault();
    if (amount === "" || receiver === "") {
        setError(true);
    } else {
        setSubmitted(true);
        setError(false);
    }
    console.log('Sending Transaction:', { amount, receiver });
    //await initiateTransaction(/* transaction details */);
  };

  return (
    <div>
      <h2>Fabcoin Transfer</h2>
      <form>
        <label>
          Amount:
          <input type="number" value={amount} onChange={handleAmount} />
        </label>
        <br />
        <label>
          Receiver:
          <input type="text" value={receiver} onChange={handleReceiver} />
        </label>
        <br />
        <button type="button" onClick={handleTransaction}>
          Initiate Transaction
        </button>
      </form>
      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>
    </div>
  );
};

export default FabcoinTransaction;

//<div>
//<h2>Fabcoin Transactions</h2>
//{/* Add transaction initiation form or button */}
//<button onClick={handleTransaction}>Initiate Transaction</button>
//</div>