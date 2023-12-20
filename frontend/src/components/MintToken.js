import React, { useState } from 'react';
//import {useLocation} from 'react-router-dom';
import './style.css'
const MintToken = () => {
  //const location = useLocation();
  const [amount, setAmount] = useState(0);
  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the amount change
  const handleAmount = (e) => {
    setAmount(e.target.value);
    setSubmitted(false);
  }
  const handleMint = (e) => {
    e.preventDefault();
    //if (location.state.userType === 'owner') {
      const mintLimit = 500;
  
      if (amount <= mintLimit && amount >=0) {
        // Proceed with minting
        console.log('Minting money...');
        setSubmitted(true);
        setError(false);
        // Add logic to mint money here
  
        // Update the total minted amount state
        // setTotalMinted(/* Update the total minted amount */);
      }
      else{
        // Notify the user about the minting limit
        console.log('Cannot mint more than 500');
        setError(true);
      }
    //}
    // Implement logic to call the mint function in your smart contract
    //console.log(`Minting ${amount} tokens`);
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
          <h1>
          Minting {amount} tokens
          </h1>
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
              <h1>Cannot mint more than 500 or negative number of tokens</h1>
          </div>
      );
  };

  return (
    <div>
      <h2>Mint Tokens</h2>
      <label className="label">Amount</label>
      <input
        type="number"
        value={amount}
        onChange={handleAmount}
      />
      <button onClick={handleMint} className="btn" type="button">
        Mint
      </button>
      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>
    </div>
  );
};

export default MintToken;